export const AI_CONFIG = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  OPENAI_MODEL: "gpt-4o-mini",
  OPENAI_URL: "https://api.openai.com/v1/chat/completions",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_URL:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent",
  CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  CLAUDE_MODEL: "claude-3-sonnet-20240229",
  CLAUDE_URL: "https://api.anthropic.com/v1/messages",
  WHISPER_URL: "https://api.openai.com/v1/audio/transcriptions",
} as const;
