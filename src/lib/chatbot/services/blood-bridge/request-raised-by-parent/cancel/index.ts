import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { updateScheduleRequest } from "@/lib/chatbot/db/blood-bridge/schedule-request";
import { getUserDetails } from "@/lib/chatbot/db/blood-bridge/patient";

export class RequestRaisedByParentCancel extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const { scheduledRequestId } = JSON.parse(context.message.payload);
    await updateScheduleRequest(scheduledRequestId, 2);
    const patientDetails = await getUserDetails(context.user.user_id);
    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: patientDetails.bridge_name },
            { type: "text", text: patientDetails.blood_group },
            {
              type: "text",
              text: patientDetails.last_bridge_donation_date,
            },
            {
              type: "text",
              text: patientDetails.expected_next_transfusion_date,
            },
          ],
        },
      ],
    };
  }
}
