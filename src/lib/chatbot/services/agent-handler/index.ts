import { MessageAgent } from "@/utils/types/whatsapp";
import { AgentHandler, MessageContext, MessageResponse } from "@/utils/types/whatsapp";
import { greetUser } from "@/lib/chatbot/services/greet-user";
import { handleFAQ } from "@/lib/ai/services/faq-handler";
import { handleBloodBridgeAgent } from "../blood-bridge/handler";

const agentHandlers: Record<MessageAgent, AgentHandler> = {
  [MessageAgent.GREETING]: async ({ from, name }) => 
    await greetUser(from, name),

  [MessageAgent.FAQ]: async ({ content, from }) => ({
    to: from,
    message: await handleFAQ(content as string),
  }),

  [MessageAgent.BLOOD_BRIDGE]: async ({ content, from }) =>
    await handleBloodBridgeAgent(content, from),

  [MessageAgent.BOUNCER]: async ({ from }) => ({
    to: from,
    message: "I'm not sure how to help with that. Could you please rephrase?",
  }),
};

export const getResponseForAgent = async (
  agent: MessageAgent | undefined,
  context: MessageContext
): Promise<MessageResponse> => {
  const handler = agent ? agentHandlers[agent] : null;
  
  if (!handler) {
    return {
      to: context.from,
      message: "I'm not sure how to help with that. Could you please rephrase?",
    };
  }

  return await handler(context);
};
