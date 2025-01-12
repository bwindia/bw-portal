import { AI_CONFIG } from "@/lib/ai/config";
import { initializeAnalyzer } from "@/lib/ai/services/agent-analyzer";
import { WHATSAPP_CONFIG } from "@/lib/chatbot/config";
import { isUserBlocked } from "@/lib/chatbot/db/message";

let analyzerInitialized = false;

const ensureAnalyzerInitialized = async () => {
  if (!analyzerInitialized) {
    await initializeAnalyzer(AI_CONFIG.OPENAI_API_KEY as string);
    analyzerInitialized = true;
  }
}

// Cache settings
const MESSAGE_CACHE_SIZE = 1000;
const processedMessageIds = new Set<string>();

// Rate limiting settings
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
const MAX_MESSAGES_PER_WINDOW = 10;
const ONE_HOUR = 3600;
const userMessageCounts = new Map<string, { count: number; firstMessage: number }>();

// Check if request has required WhatsApp structure (messages or statuses)
const isValidRequest = (body: any): boolean => {
  const change = body.object && body.entry?.[0].changes[0].value;
  return Boolean(change && (change.messages || change.statuses));
};

// Verify if message is from our configured WhatsApp number
const isValidPhoneNumberId = (metadata: any): boolean => {
  return metadata.phone_number_id === WHATSAPP_CONFIG.PHONE_NUMBER_ID;
};

// Check if we've already processed this message
const isDuplicateMessage = (messageId: string): boolean => {
  return processedMessageIds.has(messageId);
};

// Prevent processing of old messages
const isMessageTooOld = (timestamp: string): boolean => {
  const messageAge = Math.floor(Date.now() / 1000) - parseInt(timestamp);
  return messageAge > ONE_HOUR;
};

// Implement rate limiting per user
const isRateLimited = (userId: string): boolean => {
  const now = Date.now();
  const userRate = userMessageCounts.get(userId) || { count: 0, firstMessage: now };
  
  // Reset counter if window has expired
  if (now - userRate.firstMessage > RATE_LIMIT_WINDOW) {
    userRate.count = 0;
    userRate.firstMessage = now;
  }

  userRate.count++;
  userMessageCounts.set(userId, userRate);
  
  return userRate.count > MAX_MESSAGES_PER_WINDOW;
};

// Ensure audio messages have required data
const isValidAudioMessage = (message: any): boolean => {
  return message.type !== 'audio' || message.audio?.id;
};

// Update message cache and maintain size limit
const updateMessageCache = (messageId: string): void => {
  processedMessageIds.add(messageId);
  if (processedMessageIds.size > MESSAGE_CACHE_SIZE) {
    const firstId = Array.from(processedMessageIds)[0];
    if (firstId) processedMessageIds.delete(firstId);
  }
};

// Check if the webhook contains a status update
const isStatusUpdate = (change: any): boolean => {
  return Boolean(change.statuses);
};

// Validate status update structure
const isValidStatusUpdate = (status: any): boolean => {
  return Boolean(status.id && status.status); // Basic status validation
};

type WhatsAppWebhookValidationResult = {
  isValid: boolean;
  status: number;
  message: string;
};

export const validateWhatsAppRequest = async (
  body: any
): Promise<WhatsAppWebhookValidationResult> => {
  try {
    if (!isValidRequest(body)) {
      return { isValid: false, status: 404, message: "Invalid request" };
    }

    const change = body.entry[0].changes[0].value;

    // Verify phone number ID first
    if (!isValidPhoneNumberId(change.metadata)) {
      return { isValid: false, status: 403, message: "Invalid phone number ID" };
    }

    if (isStatusUpdate(change)) {
      const status = change.statuses[0];
      if (!isValidStatusUpdate(status)) {
        return { isValid: false, status: 400, message: "Invalid status update" };
      }
      return { isValid: false, status: 200, message: "STATUS_RECEIVED" };
    }

    const message = change.messages[0];
    const contact = change.contacts[0];
    const messageId = message.id;
    const userId = contact.wa_id;

    if (await isUserBlocked(userId)) {
      console.log(`Blocked user message rejected: ${userId}`);
      return { isValid: false, status: 403, message: "USER_BLOCKED" };
    }

    if (isDuplicateMessage(messageId)) {
      console.log(`Duplicate message blocked: ${messageId}`);
      return { isValid: false, status: 200, message: "DUPLICATE_EVENT" };
    }

    if (isMessageTooOld(message.timestamp)) {
      console.log(`Old message blocked: ${messageId}`);
      return { isValid: false, status: 200, message: "OLD_MESSAGE" };
    }

    if (isRateLimited(userId)) {
      console.log(`Rate limit exceeded for user ${userId}`);
      return { isValid: false, status: 429, message: "RATE_LIMIT_EXCEEDED" };
    }

    if (!isValidAudioMessage(message)) {
      console.log(`Incomplete audio message blocked: ${messageId}`);
      return { isValid: false, status: 200, message: "INCOMPLETE_AUDIO" };
    }

    await ensureAnalyzerInitialized();
    updateMessageCache(messageId);
    
    return { isValid: true, status: 200, message: "EVENT_RECEIVED" };
  } catch (error) {
    console.error("Validation error:", error);
    return { isValid: false, status: 500, message: "Internal Server Error" };
  }
};

