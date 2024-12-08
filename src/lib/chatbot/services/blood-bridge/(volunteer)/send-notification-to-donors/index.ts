import { MessageResponse } from "@/utils/types/whatsapp";

import { TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import {
  getBridgeDonors,
  getBridgeFighter,
  getBridgeVolunteers,
} from "@/lib/chatbot/db/blood-bridge/fighter";
import { getUserDetails } from "@/lib/chatbot/db/blood-bridge/fighter";
import { sendMessageToUser } from "@/lib/chatbot/services/message";
import { trackDonorCall } from "@/lib/chatbot/db/blood-bridge/track-donor-call";
import { getScheduledRequestDetails } from "@/lib/chatbot/db/blood-bridge/schedule-request";
import { PUBLIC_SCHEDULE_DONATION_PAGE_ROUTE } from "@/utils/routes";
import { generateScheduleFormToken } from "@/lib/auth/form-auth";

export class SendNotificationToDonors extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const userDetails = await getUserDetails(context.user.user_id);
    const scheduledRequestId = JSON.parse(
      context.message.payload
    ).scheduledRequestId;
    const scheduledRequestDetails = await getScheduledRequestDetails(
      scheduledRequestId
    );
    const bridgeFighter = await getBridgeFighter(
      scheduledRequestDetails.bridge_id
    );
    const bridgeDonors = await getBridgeDonors(
      scheduledRequestDetails.bridge_id
    );
    const bridgeVolunteers = await getBridgeVolunteers(
      scheduledRequestDetails.bridge_id
    );
    const eligibleDonors = bridgeDonors.filter(
      (donor) => donor.eligibility_status === "eligible"
    );

    await notifyDonors(eligibleDonors, bridgeFighter, context);
    const volunteerTemplate = (volunteer: {
      phone_number: string;
      name: string;
    }) => ({
      to: volunteer.phone_number,
      message: `A request has been raised by ${userDetails.name} for ${bridgeFighter.bridge_name}`,
    });
    await Promise.all(
      bridgeVolunteers
        .filter((volunteer) => volunteer.user_id !== userDetails.user_id)
        .map(async (volunteer) => {
          await sendMessageToUser(
            volunteerTemplate(volunteer),
            "text",
            "",
            "BUSINESS_INITIATED"
          );
        })
    );
    const formToken = await generateScheduleFormToken(scheduledRequestId);
    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [
            {
              type: "payload",
              payload: context.message.payload,
            },
          ],
        },
        {
          type: "button",
          sub_type: "url",
          index: "1",
          parameters: [
            {
              type: "text",
              text: `${PUBLIC_SCHEDULE_DONATION_PAGE_ROUTE}?token=${formToken}`,
            },
          ],
        },
      ],
    };
  }
}

const notifyDonors = async (
  bridgeDonors: any[],
  bridgeFighter: any,
  context: TemplateContext
) => {
  const donorTemplate = (donor: { phone_number: string; name: string }) => ({
    to: donor.phone_number,
    templateName: "notification_donation_bridge_request",
    components: [
      {
        type: "body",
        parameters: [
          {
            type: "text",
            text: donor.name,
          },
          {
            type: "text",
            text: bridgeFighter.bridge_name,
          },
          {
            type: "text",
            text: bridgeFighter.blood_group,
          },
          {
            type: "text",
            text: bridgeFighter.expected_next_transfusion_date,
          },
        ],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "0",
        parameters: [
          {
            type: "payload",
            payload: context.message.payload,
          },
        ],
      },
      {
        type: "button",
        sub_type: "quick_reply",
        index: "1",
        parameters: [
          {
            type: "payload",
            payload: context.message.payload,
          },
        ],
      },
    ],
  });

  await Promise.all(
    bridgeDonors.map(async (donor) => {
      await sendMessageToUser(
        donorTemplate(donor),
        "text",
        "",
        "BUSINESS_INITIATED"
      );
      await trackDonorCall(donor);
    })
  );
};
