import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { updateScheduleRequest } from "@/lib/chatbot/db/blood-bridge/schedule-request";
import { getUserDetails } from "@/lib/chatbot/db/blood-bridge/fighter";

export class RequestRaisedByFighterCancel extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const { scheduledRequestId } = JSON.parse(context.message.payload);
    await updateScheduleRequest(scheduledRequestId, 2);
    const fighterDetails = await getUserDetails(context.user.user_id);
    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: fighterDetails.bridge_name },
            { type: "text", text: fighterDetails.blood_group },
            {
              type: "text",
              text: fighterDetails.last_bridge_donation_date,
            },
            {
              type: "text",
              text: fighterDetails.expected_next_transfusion_date,
            },
          ],
        },
      ],
    };
  }
}
