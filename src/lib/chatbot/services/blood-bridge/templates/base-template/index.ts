import { MessageResponse, TemplateContext } from "@/utils/types/whatsapp";

export abstract class BaseTemplate {
  abstract handle(context: TemplateContext): Promise<MessageResponse>;
}
