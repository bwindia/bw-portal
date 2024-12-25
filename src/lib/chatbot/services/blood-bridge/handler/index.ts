import { createClient } from "@/lib/supabase/client";
import { getUserByMobile } from "@/lib/supabase/user";
import { UserRole } from "@/utils/types";
import { getTemplateHandler } from "@/lib/chatbot/services/blood-bridge/templates";
import {
  TemplateContext,
  MessageContent,
  MessageButtonContent,
  MessageInteractiveContent,
  TemplateInteractiveContext,
} from "@/utils/types/whatsapp";
import {
  ROLE_PRIORITY,
  DEFAULT_ROLE_TEMPLATE_MAP,
  FORM_PATTERNS,
} from "@/lib/chatbot/utils/templates";

const getTemplateForForm = (
  formResponse: Record<string, any>
): string | null => {
  return (
    Object.entries(FORM_PATTERNS).find(([, fields]) =>
      fields.every((field) => field in formResponse)
    )?.[0] ?? null
  );
};

const getDestinationTemplate = async (
  content: string,
  role: UserRole
): Promise<string | null> => {
  try {
    const supabase = createClient();
    const { data: template } = await supabase
      .from("mapping_chatbot_template")
      .select("destination_template")
      .eq("message_string", content)
      .eq("role", role)
      .eq("is_active", true)
      .single();

    if (template) {
      return template.destination_template;
    }

    return DEFAULT_ROLE_TEMPLATE_MAP[role]["default"] ?? null;
  } catch (error) {
    console.error("Error fetching template:", error);
    return null;
  }
};

const getHighestPriorityRole = (roles: UserRole[]): UserRole => {
  return roles.sort((a, b) => ROLE_PRIORITY[a] - ROLE_PRIORITY[b])[0];
};

const handleTextMessage = async (message: string, from: string, user: any) => {
  const role = getHighestPriorityRole(user.roles);
  // TODO: Recognise category of message such as register, need_blood, etc.
  const category = "need_blood";
  const templateName =
    DEFAULT_ROLE_TEMPLATE_MAP[role][category] ||
    DEFAULT_ROLE_TEMPLATE_MAP[role]["default"];

  if (!templateName) {
    throw new Error("We couldn't find a template for this message.");
  }

  const templateHandler = getTemplateHandler(templateName);
  const context: TemplateContext = {
    from,
    user,
    message: { text: message, payload: message },
    templateName,
  };

  return await templateHandler.handle(context);
};

const handleInteractiveForm = async (
  message: MessageInteractiveContent,
  from: string,
  user: any
) => {
  const formResponse = JSON.parse(message.response_json);
  const templateName = getTemplateForForm(formResponse);
  if (!templateName) {
    throw new Error(
      "We couldn't identify the details of your form, please contact support."
    );
  }

  const templateHandler = getTemplateHandler(templateName);
  const context: TemplateInteractiveContext = {
    from,
    user,
    message,
    templateName,
  };

  return await templateHandler.handle(context);
};

const handleButtonMessage = async (
  message: MessageButtonContent,
  from: string,
  user: any
): Promise<any> => {
  const role = getHighestPriorityRole(user.roles);
  const templateName = await getDestinationTemplate(message.text, role);

  if (!templateName) {
    throw new Error("We couldn't find a template for this message.");
  }

  const templateHandler = getTemplateHandler(templateName);
  const context: TemplateContext = {
    from,
    user,
    message,
    templateName,
  };

  return await templateHandler.handle(context);
};

export const handleBloodBridgeAgent = async (
  message: MessageContent,
  from: string
) => {
  const { data: user } = await getUserByMobile(from);
  if (!user) {
    throw new Error(
      "We couldn't process your details. Contact support to perform this action."
    );
  }
  if (typeof message === "string") {
    return await handleTextMessage(message, from, user);
  }
  if ("response_json" in message) {
    return await handleInteractiveForm(message, from, user);
  }
  if ("payload" in message) {
    return await handleButtonMessage(message, from, user);
  }
  throw new Error(
    "This message type is not supported yet. Please contact support."
  );
};
