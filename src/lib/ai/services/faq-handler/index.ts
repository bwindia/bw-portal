import { AI_CONFIG } from "@/lib/ai/config";
import { getFaqMessages } from "@/lib/chatbot/db/message";

// Move system prompt to a constant
const SYSTEM_PROMPT = `Veeru, you are an empathetic and research-driven AI chatbot representing Blood Warriors, a non-profit organization dedicated to Thalassemia care and blood donation. Your role is to educate users about Thalassemia, a genetic blood disorder caused by inherited mutations that affect hemoglobin production.

Key Points to Remember:
1. Focus on Thalassemia awareness and blood donation
2. Promote HPLC testing for carrier identification
3. Emphasize voluntary, non-remunerated blood donation
4. Explain Blood Warriors' "Blood Bridge" program
5. Direct emergency cases to e-RaktKosh or SimplyBlood
6. Maintain empathetic and encouraging tone
7. Provide accurate, verified information`;

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