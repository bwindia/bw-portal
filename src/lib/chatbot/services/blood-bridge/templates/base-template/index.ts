import {
  MessageResponse,
  TemplateContext,
  TemplateInteractiveContext,
} from "@/utils/types/whatsapp";

export abstract class BaseTemplate {
  abstract handle(context: TemplateContext | TemplateInteractiveContext): Promise<MessageResponse>;
}
