export const AI_CONFIG = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: "gpt-3.5-turbo",
} as const;

export const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export const WHISPER_URL = "https://api.openai.com/v1/audio/transcriptions";
