import { WHATSAPP_BASE_URL } from "@/lib/chatbot/config";
import { WHATSAPP_TEMPLATES } from "@/lib/chatbot/templates";
import { WhatsAppMessagePayload, AppointmentReminderParams, DirectMessageParams, TemplateMessageParams } from "@/utils/types/whatsapp";

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
}

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
}

export const sendDirectMessage = async ({
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
}

export const sendTemplateMessage = async ({
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
}
