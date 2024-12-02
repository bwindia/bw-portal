import { createClient } from "@/lib/supabase/client";
import { getUserByMobile } from "@/lib/supabase/user";
import { UserRole } from "@/utils/types";
import { getTemplateHandler } from "@/lib/chatbot/services/blood-bridge/templates";
import { MessageButtonContent, TemplateContext } from "@/utils/types/whatsapp";

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

export const handleBloodBridgeAgent = async (
  message: MessageButtonContent,
  from: string
) => {
  const { data: user } = await getUserByMobile(from);
  if (!user) {
    throw new Error(
      "We couldn't process you details. Contact support to perform this action."
    );
  }

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
