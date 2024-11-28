import { analyzeAgentForMessage } from "@/lib/ai/services/agent-analyzer";
import { MessageAgent } from "@/utils/types/whatsapp";
import { sendMessageToUser } from "@/lib/chatbot/services/message";
import { convertAudioToText } from "@/lib/ai/services/speech-to-text";
import { WHATSAPP_CONFIG, WHATSAPP_URL } from "@/lib/chatbot/config";
import { MessageProcessor } from "@/utils/types/whatsapp";
import { getResponseForAgent } from "../../services/agent-handler";

const handleAudioMessage = async (message: any): Promise<string> => {
  const audioId = message.audio.id;

  // Download the audio file from Meta's servers
  const response = await fetch(`${WHATSAPP_URL}/${audioId}`, {
    headers: {
      Authorization: `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to process audio message, please try again later.");
  }

  const audioBuffer = await response.arrayBuffer();

  if (!audioBuffer) {
    throw new Error("Failed to process audio message, please try again later.");
  }
  // Convert audio to text using OpenAI's Whisper API (or any other speech-to-text service)
  const text = await convertAudioToText(audioBuffer);
  return text;
};

const messageProcessors: Record<string, MessageProcessor> = {
  text: async (message) => message.text.body,
  audio: handleAudioMessage,
  button: async (message) => message.button,
  interactive: async (message) => message.interactive.nfm_reply,
};

export const handleWhatsAppMessage = async (message: any, contact: any) => {
  const from = message.from;
  const name = contact.profile.name;
  const messageType = message.type;

  // Determine message type
  let messageContent;
  let agent: MessageAgent | undefined;

  try {
    const processor = messageProcessors[messageType];
    messageContent = processor ? await processor(message) : null;

    if (!messageContent) {
      throw new Error(
        "Sorry, I can only process text and audio messages at the moment."
      );
    }

    agent =
      messageType === "button" || messageType === "interactive"
        ? MessageAgent.BLOOD_BRIDGE
        : await analyzeAgentForMessage(messageContent);
    const response = await getResponseForAgent(agent, {
      content: messageContent,
      from,
      name,
    });
    await sendMessageToUser(
      response,
      messageType,
      messageContent,
      agent || "NA"
    );
  } catch (error: any) {
    const response = {
      to: from,
      message: error.message as string,
    };
    await sendMessageToUser(
      response,
      messageType,
      messageContent as string,
      agent || "NA"
    );
  }
};
