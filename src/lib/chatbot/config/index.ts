export const WHATSAPP_CONFIG = {
  ACCESS_TOKEN: process.env.META_ACCESS_TOKEN,
  PHONE_NUMBER_ID: process.env.META_PHONE_NUMBER_ID,
  VERIFY_TOKEN: process.env.META_VERIFY_TOKEN,
  API_VERSION: "v16.0",
} as const;

export const WHATSAPP_URL = `https://graph.facebook.com/${WHATSAPP_CONFIG.API_VERSION}`;

export const WHATSAPP_BASE_URL = `${WHATSAPP_URL}/${WHATSAPP_CONFIG.PHONE_NUMBER_ID}`;
