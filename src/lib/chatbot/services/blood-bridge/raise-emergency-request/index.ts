import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { getUserDetails } from "@/lib/chatbot/db/blood-bridge/patient";
import { getBridgeVolunteers } from "@/lib/chatbot/db/blood-bridge/patient";
import { schedulePatientRequest } from "@/lib/chatbot/db/blood-bridge/schedule-request";

export class RaiseEmergencyRequest extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const patientDetails = await getUserDetails(context.user.user_id);
    const bridgeVolunteers = await getBridgeVolunteers(patientDetails.bridge_id);
    const scheduledRequest = await schedulePatientRequest(patientDetails);
    
    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: bridgeVolunteers.map((volunteer) => volunteer.name).join(", "),
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
              payload: JSON.stringify({ scheduledRequestId: scheduledRequest.id }),
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
              payload: JSON.stringify({ scheduledRequestId: scheduledRequest.id }),
            },
          ],
        },
      ],
    };
  }
}