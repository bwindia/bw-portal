import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";
import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { getUserDetails } from "@/lib/chatbot/db/blood-bridge/fighter";
import { getBridgeVolunteers } from "@/lib/chatbot/db/blood-bridge/fighter";

export class RaiseBloodBridgeRequest extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    const fighterDetails = await getUserDetails(context.user.user_id);
    const bridgeVolunteers = await getBridgeVolunteers(
      fighterDetails.bridge_id
    );

    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: bridgeVolunteers
                .map((volunteer) => volunteer.name)
                .join(", "),
            },
          ],
        },
      ],
    };
  }
}
