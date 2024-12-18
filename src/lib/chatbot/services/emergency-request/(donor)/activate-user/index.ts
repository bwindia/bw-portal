import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { TemplateContext } from "@/utils/types/whatsapp";
import { MessageResponse } from "@/utils/types/whatsapp";

export class ActivateUser extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    return {
      to: context.from,
      templateName: context.templateName,
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: context.user.name,
            },
          ],
        },
      ],
    };
  }
}
