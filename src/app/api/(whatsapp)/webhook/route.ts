import { WHATSAPP_CONFIG } from "@/lib/chatbot/config";
import { handleWhatsAppMessage } from "@/lib/chatbot/controllers/user-message";
import { validateWhatsAppRequest } from "@/lib/chatbot/validator";

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
    const body = await request.json();
    const validation = await validateWhatsAppRequest(body);

    if (!validation.isValid) {
      return new Response(validation.message, { status: validation.status });
    }

    const message = body.entry[0].changes[0].value.messages[0];
    const contact = body.entry[0].changes[0].value.contacts[0];

    const messageProcessing = handleWhatsAppMessage(message, contact);

    messageProcessing
      .then(() => {
        console.log("Successfully processed message:", {
          messageId: message.id,
          type: message.type,
          timestamp: message.timestamp,
          userId: contact.wa_id,
        });
      })
      .catch((error) => {
        console.error("Error processing message:", {
          messageId: message.id,
          error,
          userId: contact.wa_id,
        });
      });

    await messageProcessing;
    return new Response("EVENT_RECEIVED", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
