import { AI_CONFIG } from "@/lib/ai/config";
import { initializeAnalyzer } from "@/lib/ai/services/agent-analyzer";
import { WHATSAPP_CONFIG } from "@/lib/chatbot/config";
import { handleWhatsAppMessage } from "@/lib/chatbot/controllers/user-message";

let analyzerInitialized = false;

async function ensureAnalyzerInitialized() {
  console.log("Checking if analyzer is initialized");
  if (!analyzerInitialized) {
    console.log("Initializing analyzer");
    await initializeAnalyzer(AI_CONFIG.OPENAI_API_KEY as string);
    analyzerInitialized = true;
  }
  console.log("Analyzer is initialized");
}

export async function GET(request: Request) {
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
}

export async function POST(request: Request) {
  try {
    await ensureAnalyzerInitialized();
    
    const body = await request.json();
    
    if (body.object && body.entry?.[0].changes[0].value.messages) {
      console.log("Webhook Received:", JSON.stringify(body, null, 2));
      const message = body.entry[0].changes[0].value.messages[0];
      const contact = body.entry[0].changes[0].value.contacts[0];

      await handleWhatsAppMessage(message, contact);

      return new Response("EVENT_RECEIVED", { status: 200 });
    }

    if (body.object && body.entry?.[0].changes[0].value.statuses) {
      // You can process status updates here if needed
      return new Response("STATUS_RECEIVED", { status: 200 });
    }

    return new Response("Not Found", { status: 404 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
