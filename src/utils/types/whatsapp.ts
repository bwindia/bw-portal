export type WhatsAppTemplate = {
  name: string;
  language: { code: string };
  components: Array<{
    type: string;
    sub_type?: string;
    index?: string;
    parameters: Array<{
      type: string;
      text?: string;
      payload?: string;
    }>;
  }>;
};

export type WhatsAppMessagePayload = {
  messaging_product: "whatsapp";
  to: string;
  type: "template" | "text";
  template?: WhatsAppTemplate;
  text?: {
    body: string;
    preview_url?: boolean;
  };
};

export type AppointmentReminderParams = {
  to: string;
  name: string;
  time: string;
  appointmentType: string;
};

export type DirectMessageParams = {
  to: string;
  message: string;
  previewUrl?: boolean;
};

export type TemplateMessageParams = {
  to: string;
  templateName: string;
  languageCode?: string;
  components?: Array<{
    type: string;
    sub_type?: string;
    index?: string;
    parameters: Array<{
      type: string;
      text?: string;
      payload?: string;
    }>;
  }>;
};

export enum MessageType {
  TEXT = "text",
  AUDIO = "audio",
  IMAGE = "image",
}

export enum MessageAgent {
  GREETING = "greeting",
  FAQ = "faq",
  BLOOD_BRIDGE = "blood_bridge",
  BOUNCER = "bouncer",
}

export interface WhatsAppMessage {
  from: string;
  text?: {
    body: string;
  };
  audio?: {
    url: string;
  };
  image?: {
    url: string;
  };
}
