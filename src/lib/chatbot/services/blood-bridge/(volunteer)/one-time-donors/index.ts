import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import {
  getBridgeFighter,
  getOneTimeDonorsForBridge,
} from "@/lib/chatbot/db/blood-bridge/fighter";
import { generateScheduleFormToken } from "@/lib/auth/form-auth";
import { PUBLIC_SCHEDULE_DONATION_PAGE_ROUTE } from "@/utils/routes";
import { getScheduledRequestDetails } from "@/lib/chatbot/db/blood-bridge/schedule-request";

export class OneTimeDonors extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const { scheduledRequestId } = JSON.parse(context.message.payload);
    const scheduledRequestDetails = await getScheduledRequestDetails(
      scheduledRequestId
    );
    const bridgeFighter = await getBridgeFighter(
      scheduledRequestDetails.bridge_id
    );
    const oneTimeDonors = await getOneTimeDonorsForBridge(
      bridgeFighter.blood_group
    );

    const templateText = oneTimeDonors
      .map((donor) => `${donor.name} (+${donor.phone_number})`)
      .join(", ");
    const formToken = await generateScheduleFormToken(scheduledRequestId);

    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: templateText || "No donors found" },
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
