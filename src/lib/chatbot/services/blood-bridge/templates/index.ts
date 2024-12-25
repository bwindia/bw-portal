import { BaseTemplate } from "@/lib/chatbot/services/blood-bridge/templates/base-template";
import { TEMPLATE_MAP } from "@/lib/chatbot/utils/templates";

export const getTemplateHandler = (templateName: string): BaseTemplate => {
  const TemplateHandler = TEMPLATE_MAP[templateName];
  if (!TemplateHandler) {
    throw new Error(
      `We couldn't process your request. Please try again later.`
    );
  }
  return new TemplateHandler();
};
