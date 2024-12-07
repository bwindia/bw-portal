import { WHATSAPP_BASE_URL } from "@/lib/chatbot/config";
import { WHATSAPP_TEMPLATES } from "@/lib/chatbot/templates";
import { createClient } from "@/lib/supabase/client";
import {
  WhatsAppMessagePayload,
  AppointmentReminderParams,
  DirectMessageParams,
  TemplateMessageParams,
  MessageResponse,
} from "@/utils/types/whatsapp";

const sendWhatsAppMessage = async (payload: WhatsAppMessagePayload) => {
  const response = await fetch(`${WHATSAPP_BASE_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to send message:", errorText);
    throw new Error("Failed to send message");
  }

  return response.json();
};

export const sendAppointmentReminder = async ({
  to,
  name,
  time,
  appointmentType,
}: AppointmentReminderParams) => {
  const yesButtonPayload = { id: "123" };
  const noButtonPayload = { id: "126587" };

  const payload: WhatsAppMessagePayload = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: WHATSAPP_TEMPLATES.APPOINTMENT_REMINDER,
      language: { code: "en" },
      components: [
        {
          type: "button",
          sub_type: "quick_reply",
          index: "0",
          parameters: [
            { type: "payload", payload: JSON.stringify(yesButtonPayload) },
          ],
        },
        {
          type: "button",
          sub_type: "quick_reply",
          index: "1",
          parameters: [
            { type: "payload", payload: JSON.stringify(noButtonPayload) },
          ],
        },
        {
          type: "body",
          parameters: [
            { type: "text", text: name },
            { type: "text", text: appointmentType },
            { type: "text", text: time },
            { type: "text", text: "attend" },
          ],
        },
      ],
    },
  };

  return sendWhatsAppMessage(payload);
};

const sendDirectMessage = async ({
  to,
  message,
  previewUrl = false,
}: DirectMessageParams) => {
  const payload: WhatsAppMessagePayload = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: {
      body: message,
      preview_url: previewUrl,
    },
  };

  return sendWhatsAppMessage(payload);
};

const sendTemplateMessage = async ({
  to,
  templateName,
  components,
  languageCode,
}: TemplateMessageParams) => {
  const messagePayload: WhatsAppMessagePayload = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name: templateName,
      language: { code: languageCode || "en" },
      components: components || [],
    },
  };

  return sendWhatsAppMessage(messagePayload);
};

export const sendMessageToUser = async (response: MessageResponse, messageType: "text" | "audio", message: string, agent: string) => {
  if ("templateName" in response) {
    await sendTemplateMessage(response);
  } else if ("message" in response) {
    await sendDirectMessage(response);
  } else {
    throw new Error("Invalid message type");
  }
  await storeMessageToDatabase(response, messageType, message, agent, response.to); 
};

export const storeMessageToDatabase = async (
  response: MessageResponse,
  messageType: "text" | "audio",
  message: string,
  agent: string,
  mobile: string
) => {
  // Check if response has templateName or message property
  const supabase = createClient();
  let responseMessage;
  if ("templateName" in response) {
    responseMessage = response.templateName;
  } else if ("message" in response) {
    responseMessage = response.message;
  } else {
    responseMessage = "error";
  }

  const { error } = await supabase.from("tracker_chatbot_message").insert({
    mobile: mobile,
    message_type_id:
      messageType === "text" ? 1 : messageType === "audio" ? 4 : 7,
    message,
    agent,
    response: responseMessage,
  });
  if (error) {
    throw new Error(
      "Our server is currently experiencing issues, please try again later."
    );
  }
};
