import { handleFAQ } from "@/lib/ai/services/faq-handler";
import { analyzeAgentForMessage } from "@/lib/ai/services/agent-analyzer";
import { MessageAgent } from "@/utils/types/whatsapp";
import { sendDirectMessage } from "@/lib/chatbot/services/message";
import { greetUser } from "@/lib/chatbot/services/greet-user";
import { convertAudioToText } from "@/lib/ai/services/speech-to-text";
import { WHATSAPP_CONFIG, WHATSAPP_URL } from "@/lib/chatbot/config";

export const handleWhatsAppMessage = async (message: any, contact: any) => {
  const from = message.from;
  const name = contact.profile.name;
  const messageType = message.type;

  // Determine message type
  let messageContent;

  switch (messageType) {
    case "text":
      messageContent = message.text.body;
      break;
    case "audio":
      // Convert audio to text and process
      handleAudioMessage(message);
      break;

    case "image":
      // Process image content
      // You might want to use Vision API or similar
      break;

    default:
      return await sendDirectMessage({
        to: from,
        message: "Sorry, I can only process text messages at the moment.",
      });
  }

  if (message.text) {
    messageContent = message.text.body;
  } else if (message.audio) {
    messageContent = message.audio.url;
  }

  // For text messages, analyze intent
  if (messageType === "text") {
    const intent = await analyzeAgentForMessage(messageContent);
    console.log("Intent:", intent);

    switch (intent) {
      case MessageAgent.GREETING:
        return await greetUser(from, name);

      case MessageAgent.FAQ:
        const faqResponse = await handleFAQ(messageContent);
        return await sendDirectMessage({
          to: from,
          message: faqResponse,
        });

      case MessageAgent.BLOOD_BRIDGE:
        // Process donation scheduling
        // const donationDetails = await processScheduleDonation(messageContent);
        return;
      // await sendDonationTemplate({
      //   to: from,
      //   name: name,
      //   ...donationDetails,
      // });

      default:
        // Handle unknown intent
        return await sendDirectMessage({
          to: from,
          message:
            "I'm not sure how to help with that. Could you please rephrase?",
        });
    }
  }
};

const handleAudioMessage = async (message: any): Promise<string | null> => {
  try {
    const audioId = message.audio.id;

    // Download the audio file from Meta's servers
    const response = await fetch(`${WHATSAPP_URL}/${audioId}`, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to download audio file");
    }

    const audioBuffer = await response.arrayBuffer();

    if (!audioBuffer) {
      throw new Error("Failed to download audio file");
    }
    // Convert audio to text using OpenAI's Whisper API (or any other speech-to-text service)
    const text = await convertAudioToText(audioBuffer);
    return text;
  } catch (error) {
    console.error("Error processing audio message:", error);
    return null;
  }
};
