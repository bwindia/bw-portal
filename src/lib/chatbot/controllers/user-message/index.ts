import { analyzeAgentForMessage } from "@/lib/ai/services/agent-analyzer";
import { MessageAgent } from "@/utils/types/whatsapp";
import { sendMessageToUser } from "@/lib/chatbot/services/message";
import { convertAudioToText } from "@/lib/ai/services/speech-to-text";
import { WHATSAPP_CONFIG, WHATSAPP_URL } from "@/lib/chatbot/config";
import { MessageProcessor } from "@/utils/types/whatsapp";
import { getResponseForAgent } from "../../services/agent-handler";
import axios from "axios";

const handleAudioMessage = async (message: any): Promise<string> => {
  const audioId = message.audio.id;

  try {
    const mediaResponse = await fetch(`${WHATSAPP_URL}/${audioId}/`, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
      },
    });

    if (!mediaResponse.ok) {
      throw new Error(`Failed to download audio: ${mediaResponse.statusText}`);
    }

    const mediaData = await mediaResponse.json();
    if (!mediaData.url) {
      throw new Error("No media URL found in response");
    }

    const response = await axios.get(mediaData.url, {
      headers: {
        Authorization: `Bearer ${WHATSAPP_CONFIG.ACCESS_TOKEN}`,
        "Content-Type": mediaData.mime_type,
      },
      responseType: "arraybuffer",
    });

    if (response.data) {
      return await convertAudioToText(response.data);
    }

    throw new Error(
      "We couldn't process your audio message, please try again later."
    );
  } catch (error) {
    console.error("Error in handleAudioMessage", error);
    throw new Error(
      "We couldn't process your audio message, please try again later."
    );
  }
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
    console.error("Error in handleWhatsAppMessage", error);
    const isSystemError = error.name !== "Error";
    const errorMessage = isSystemError
      ? "Our systems are currently busy, please try again later."
      : error.message;

    const response = {
      to: from,
      message: errorMessage,
    };

    await sendMessageToUser(
      response,
      messageType,
      messageContent as string,
      `error-${agent || "NA"}`
    );
  }
};
