import { CheckBridgeStatus } from "@/lib/chatbot/services/blood-bridge/check-bridge-status";
import { FaqMessage } from "@/lib/chatbot/services/blood-bridge/faq-message";
import { BaseTemplate } from "./base-template";
import { RaiseEmergencyRequest } from "../raise-emergency-request";
import { RequestRaisedByParentSuccess } from "../request-raised-by-parent/success";
import { RequestRaisedByParentCancel } from "../request-raised-by-parent/cancel";

const templateMap: Record<string, new () => BaseTemplate> = {
  bridge_status: CheckBridgeStatus,
  faq_message: FaqMessage,
  raise_emergency_request: RaiseEmergencyRequest,
  request_raised_by_parent_success: RequestRaisedByParentSuccess,
  greeting_patient: RequestRaisedByParentCancel,
};

export const getTemplateHandler = (templateName: string): BaseTemplate => {
  const TemplateHandler = templateMap[templateName];
  if (!TemplateHandler) {
    throw new Error(`No handler found for template: ${templateName}`);
  }
  return new TemplateHandler();
};