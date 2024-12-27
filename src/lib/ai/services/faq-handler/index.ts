import { AI_CONFIG } from "@/lib/ai/config";
import { getFaqMessages } from "@/lib/chatbot/db/message";

// Move system prompt to a constant
const SYSTEM_PROMPT = `Your name is Veeru, a compassionate and research-driven AI chatbot representing Blood Warriors, a non-profit organization dedicated to Thalassemia care, blood donation, and prevention. Your mission is to educate users, inspire action, and provide guidance on these vital topics, always adhering to India’s National Blood Policy in your recommendations. Aligned with Blood Warriors’ vision of a Thalassemia-free India by 2035, your objectives include building awareness by motivating individuals to donate blood, learn about Thalassemia, join Blood Warriors as regular Blood Bridge donors, undergo HPLC testing, and spread awareness to further the mission. Additionally, you support patients by offering resources for medical care, emotional support, and information about initiatives like the Blood Bridge Program. As a WhatsApp-friendly bot, you deliver concise, user-focused responses while adhering to WhatsApp formatting guidelines for clear and engaging communication. Your tone is empathetic, encouraging, and factual, empowering users to contribute through blood donation, preventive testing, or volunteering. In addition to providing detailed guidance on Thalassemia and blood donation, you address queries about India’s blood donation policies and direct users to reliable resources when needed. For emergency blood requirements, you recommend platforms like 
For Emergency Blood Requirements, provide following resources to search for donors:
1) http://simplyblood.in/
2) https://eraktkosh.mohfw.gov.in/
3) https://www.ublood.com/
4) https://www.bloodconnect.org/
 to locate blood centres and donors. 

Together, let’s strive to achieve a Thalassemia-free India by 2035! to know more users can visit bloodwarriors.in

To encourage people to register as donors, request them to sign-up on bit.ly/bloodbridge

For ANY questions not directly related to Thalassemia, blood donation, or Blood Warriors' services, respond courteously, explaining that you are unable to provide answers on those topics. Encourage the individual to explore questions or contributions focused on Thalassemia, blood donation, or Blood Warriors' services. Suggest meaningful ways to engage, such as donating blood, learning more about Thalassemia, or undergoing HPLC testing.`;

const formatResponse = (response: string): string => {
  return response.replace(/(\*\*|\*\*)/g, "*").replace(/(\#|\#)/g, "");
};
const handleOpenAIRequest = async (
  question: string,
  from: string
): Promise<string> => {
  const openaiApiKey = AI_CONFIG.OPENAI_API_KEY;
  if (!openaiApiKey) {
    throw new Error("OpenAI API key is not configured");
  }

  const messages = await getFaqMessages(from);

  const conversationHistory = messages.flatMap((message) => [
    {
      role: "user",
      content: message.message,
    },
    {
      role: "assistant",
      content: message.response,
    },
  ]);

  const response = await fetch(AI_CONFIG.OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.OPENAI_40_MINI_MODEL,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...conversationHistory,
        {
          role: "user",
          content: question,
        },
      ],
      temperature: 0.5,
      max_tokens: 500,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `OpenAI API error: ${data.error?.message || "Unknown error"}`
    );
  }

  // Remove ** and replace with *
  return formatResponse(data.choices[0].message.content);
};

const handleClaudeRequest = async (question: string) => {
  const claudeResponse = await fetch(AI_CONFIG.CLAUDE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": AI_CONFIG.CLAUDE_API_KEY as string,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: AI_CONFIG.CLAUDE_MODEL,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: question }],
      temperature: 0.5,
      max_tokens: 500,
    }),
  });

  if (!claudeResponse.ok) {
    throw new Error("Claude API failed");
  }

  const data = await claudeResponse.json();
  return formatResponse(data.content[0].text);
};

const handleGeminiRequest = async (question: string) => {
  const geminiResponse = await fetch(
    `${AI_CONFIG.GEMINI_URL}?key=${AI_CONFIG.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${SYSTEM_PROMPT}\n\nUser question: ${question}` }],
          },
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 500,
        },
      }),
    }
  );

  if (!geminiResponse.ok) {
    throw new Error("Gemini API failed");
  }

  const data = await geminiResponse.json();
  return formatResponse(data.candidates[0].content.parts[0].text);
};

export const handleFAQ = async (
  question: string,
  from: string
): Promise<string> => {
  try {
    // Get conversation history
    // const messages = await getFaqMessages(from);
    // const context = messages.map((m) => ({
    //   question: m.message,
    //   answer: m.response,
    // }));
    // return await handleOpenAIRequest(question, context);
    // Try OpenAI first
    return await handleOpenAIRequest(question, from);
  } catch (openaiError) {
    console.error("OpenAI failed:", openaiError);

    try {
      // Try Claude as first fallback
      return await handleClaudeRequest(question);
    } catch (claudeError) {
      console.error("Claude failed:", claudeError);

      try {
        // Try Gemini as final fallback
        return await handleGeminiRequest(question);
      } catch (geminiError) {
        console.error("Gemini failed:", geminiError);
        throw new Error(
          "We are facing some issues internally. Please try again later."
        );
      }
    }
  }
};

// import { ChatOpenAI } from "@langchain/openai";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { RunnableSequence } from "@langchain/core/runnables";
// import { StringOutputParser } from "@langchain/core/output_parsers";

// Initialize LangChain components
// let faqChain: RunnableSequence | null = null;

// const initializeFaqChain = (apiKey: string) => {
//   if (!faqChain) {
//     const chatModel = new ChatOpenAI({
//       modelName: AI_CONFIG.OPENAI_40_MINI_MODEL,
//       temperature: 0.5,
//       maxTokens: 500,
//       openAIApiKey: apiKey,
//     });

//     const prompt = ChatPromptTemplate.fromMessages([
//       ["system", SYSTEM_PROMPT],
//       ["human", "{question}"],
//     ]);

//     faqChain = RunnableSequence.from([
//       prompt,
//       chatModel,
//       new StringOutputParser(),
//     ]);
//   }
//   return faqChain;
// }

// const handleOpenAIRequest = async (question: string, context: any) => {
//   const chain = initializeFaqChain(AI_CONFIG.OPENAI_API_KEY as string);
//   const response = await chain.invoke({
//     question,
//     context: JSON.stringify(context),
//   });
//   return formatResponse(response);
// };
