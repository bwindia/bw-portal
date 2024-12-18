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

const ROLE_PRIORITY: { [key in UserRole]: number } = {
  Volunteer: 1,
  Patient: 2,
  "Bridge Donor": 3,
  "Emergency Donor": 4,
  Guest: 5,
};

const MANUAL_TEMPLATE_MAP: Record<string, string> = {
  "Send Notification": "send_notification_to_donors",
  "Schedule a donation": "schedule_donation",
};

const getTemplateForForm = (
  formResponse: Record<string, any>
): string | null => {
  const formPatterns = {
    raise_emergency_request_form: [
      "screen_1_TextInput_0",
      "screen_0_Dropdown_4",
      "screen_0_Dropdown_5",
    ],
    change_transfusion_date_form: [
      "screen_0_DatePicker_0",
      "screen_0_TextInput_1",
      "screen_0_DatePicker_2",
    ],
    donor_registration_form: [
      "screen_0_Your_Full_Name_0",
      "screen_0_Location_Pincode_1",
      "screen_0_Email_2",
      "screen_0_Blood_Group_3",
      "screen_0_Select_this_if_you_want_to_be_the_vision_guardian_of_ThalassemiaFreeIndia2035_4"
    ]
  };

  for (const [formType, fields] of Object.entries(formPatterns)) {
    if (fields.every((field) => field in formResponse)) {
      return formType;
    }
  }
  return null;
};

const getDestinationTemplate = async (content: string, role: UserRole) => {
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
  if (!template) {
    return { destination_template: MANUAL_TEMPLATE_MAP[content] };
  }
  return null;
};

const handleTextMessage = async (message: string, from: string, user: any) => {
  const highestPriorityRole = user.roles.sort(
    (a: UserRole, b: UserRole) => ROLE_PRIORITY[a] - ROLE_PRIORITY[b]
  )[0];

  const templateName = await getDestinationTemplate(
    message,
    highestPriorityRole
  );
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
    message: message as MessageInteractiveContent,
    templateName,
  };

  return await templateHandler.handle(context);
};

const handleButtonMessage = async (
  message: MessageButtonContent,
  from: string,
  user: any
) => {
  const highestPriorityRole = user.roles.sort(
    (a: UserRole, b: UserRole) => ROLE_PRIORITY[a] - ROLE_PRIORITY[b]
  )[0];

  const templateName = await getDestinationTemplate(
    message.text,
    highestPriorityRole
  );
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
      "We couldn't process you details. Contact support to perform this action."
    );
  }
  if (typeof message === "string") {
    return handleTextMessage(message, from, user);
  }
  if ("response_json" in message) {
    return handleInteractiveForm(message, from, user);
  }
  if ("payload" in message) {
    return handleButtonMessage(message, from, user);
  }
  throw new Error(
    "This message type is not supported yet. Please contact support."
  );
};
