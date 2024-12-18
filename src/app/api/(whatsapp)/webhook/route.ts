import { AI_CONFIG } from "@/lib/ai/config";
import { initializeAnalyzer } from "@/lib/ai/services/agent-analyzer";
import { WHATSAPP_CONFIG } from "@/lib/chatbot/config";
import { handleWhatsAppMessage } from "@/lib/chatbot/controllers/user-message";

let analyzerInitialized = false;

const ensureAnalyzerInitialized = async () => {
  if (!analyzerInitialized) {
    await initializeAnalyzer(AI_CONFIG.OPENAI_API_KEY as string);
    analyzerInitialized = true;
  }
}

// Add a simple in-memory cache for message IDs
const processedMessageIds = new Set<string>();
const MESSAGE_CACHE_SIZE = 1000; // Adjust based on your needs

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // Verify token and mode
  if (mode === "subscribe" && token === WHATSAPP_CONFIG.VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  } else {
    return new Response("Forbidden", { status: 403 });
  }
};

export const POST = async (request: Request) => {
  try {
    await ensureAnalyzerInitialized();

    const body = await request.json();

    if (body.object && body.entry?.[0].changes[0].value.messages) {
      const message = body.entry[0].changes[0].value.messages[0];
      
      // Check if we've already processed this message
      if (processedMessageIds.has(message.id)) {
        console.log(`Duplicate message detected: ${message.id}`);
        return new Response("DUPLICATE_EVENT", { status: 200 });
      }

      // Add message ID to cache
      processedMessageIds.add(message.id);
      
      // Prevent memory leaks by limiting cache size
      if (processedMessageIds.size > MESSAGE_CACHE_SIZE) {
        const firstId = processedMessageIds.values().next().value;
        if (firstId) {
          processedMessageIds.delete(firstId);
        }
      }

      if (body.entry?.[0].changes[0].value.metadata.phone_number_id === WHATSAPP_CONFIG.PHONE_NUMBER_ID) {
        console.log("Processing new message:", message.id);
        const contact = body.entry[0].changes[0].value.contacts[0];
        await handleWhatsAppMessage(message, contact);
        return new Response("EVENT_RECEIVED", { status: 200 });
      }
    }

    if (body.object && body.entry?.[0].changes[0].value.statuses && body.entry?.[0].changes[0].value.metadata.phone_number_id === WHATSAPP_CONFIG.PHONE_NUMBER_ID) {
      // You can process status updates here if needed
      return new Response("STATUS_RECEIVED", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
