import { getBridgeFighter, getUserDetails } from "@/lib/chatbot/db/blood-bridge/fighter";
import { getScheduledRequestDetails, updateScheduleRequest } from "@/lib/chatbot/db/blood-bridge/schedule-request";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";

import { MessageResponse } from "@/utils/types/whatsapp";

import { TemplateContext } from "@/utils/types/whatsapp";

export class CancelBridgeRequest extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const { scheduledRequestId } = JSON.parse(context.message.payload);
    await updateScheduleRequest(scheduledRequestId, 2);
    const scheduledRequestDetails = await getScheduledRequestDetails(scheduledRequestId);
    const bridgeFighter = await getBridgeFighter(scheduledRequestDetails.bridge_id);
    const userDetails = await getUserDetails(context.user.user_id);
    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: userDetails.name },
            { type: "text", text: bridgeFighter.bridge_name },
          ],
        },
      ],
    };
  }
}
