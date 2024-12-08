import {
  getBridgeDonors,
  getUserDetails,
} from "@/lib/chatbot/db/blood-bridge/fighter";
import { getScheduledRequestDetails } from "@/lib/chatbot/db/blood-bridge/schedule-request";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";

export class ListBridgeDonors extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const userDetails = await getUserDetails(context.user.user_id);
    const { scheduledRequestId } = JSON.parse(context.message.payload);
    const scheduledRequestDetails = await getScheduledRequestDetails(
      scheduledRequestId
    );
    const bridgeDonors = await getBridgeDonors(
      scheduledRequestDetails.bridge_id
    );
    const eligibleDonors = bridgeDonors.filter(
      (donor) => donor.eligibility_status === "eligible"
    );

    if (eligibleDonors.length === 0) {
      return {
        to: context.from,
        templateName: "no_eligible_donors_bridge",
        components: [
          {
            type: "body",
            parameters: [
              {
                type: "text",
                text: userDetails.name,
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
        ],
      };
    }

    const eligibleDonorsList = eligibleDonors
      .map((donor, index) => `${index + 1}. ${donor.name}`)
      .join(", ");

    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: eligibleDonorsList,
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
      ],
    };
  }
}
