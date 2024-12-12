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
      document?: {
        link: string;
        filename: string;
      };
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

export type MessageProcessor = (message: any) => Promise<string | null>;

export type MessageResponse = DirectMessageParams | TemplateMessageParams;

export type MessageButtonContent = { text: string; payload: string };

export type MessageInteractiveContent = {
  response_json: string;
  body: string;
  name: string;
};

export type MessageContent =
  | string
  | MessageButtonContent
  | MessageInteractiveContent;

export interface MessageContext {
  content: MessageContent;
  from: string;
  name: string;
}

export interface TemplateContext {
  from: string;
  user: any; // Replace 'any' with your user type
  message: MessageButtonContent;
  templateName: string;
}

export interface TemplateInteractiveContext {
  from: string;
  user: any; // Replace 'any' with your user type
  message: MessageInteractiveContent;
  templateName: string;
}

export type AgentHandler = (
  context: MessageContext
) => Promise<MessageResponse>;
