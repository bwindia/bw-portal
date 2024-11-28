import { BaseTemplate } from "../templates/base-template";
import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";

export class FaqMessage extends BaseTemplate {
  async handle(context: TemplateContext): Promise<MessageResponse> {
    return {
      to: context.from,
      templateName: context.templateName,
    };
  }
}
