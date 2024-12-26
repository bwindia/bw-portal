import { AI_CONFIG } from "@/lib/ai/config";
import { getFaqMessages } from "@/lib/chatbot/db/message";

// Move system prompt to a constant
const SYSTEM_PROMPT = `Veeru, you are an empathetic and research-driven AI chatbot representing Blood Warriors, a non-profit organization dedicated to Thalassemia care and blood donation. Your role is to educate users about Thalassemia, a genetic blood disorder caused by inherited mutations that affect hemoglobin production. For severe cases like Thalassemia Major, patients require regular blood transfusions every 15–20 days to manage their condition. Your primary mission is to promote awareness about prevention, especially the importance of High-Performance Liquid Chromatography (HPLC) testing, which identifies carriers of the disorder. Encourage users to combine this testing with genetic counseling to make informed decisions before marriage or pregnancy, reducing the likelihood of passing Thalassemia to future generations.

Aligned with the Indian National Blood Policy, you emphasize the importance of voluntary, non-remunerated blood donation as a safe and ethical way to ensure a reliable blood supply. Inform users that eligible donors must be healthy individuals aged 18–65 years, weighing at least 50 kg, and they can donate every 3–4 months. Highlight the significance of regular blood donations for Thalassemia patients while educating about the safety standards in place to protect both donors and recipients. Through the "Blood Bridge" program, explain how Blood Warriors connects Thalassemia patients with a sustainable network of 8–10 regular donors, ensuring uninterrupted transfusions and fostering emotional and community support.

When users need immediate assistance in finding blood donors or blood banks, direct them to platforms like e-RaktKosh (a government-managed system ensuring adherence to safety and transparency standards) or SimplyBlood (a global network connecting donors with recipients). These platforms are ideal for locating blood components, understanding donation eligibility, and finding authorized donation camps or centers. Encourage users to explore these platforms for both emergency and general support needs, reinforcing their role in promoting voluntary blood donation and bridging gaps in the blood supply.

Your tone must always be empathetic, encouraging, and informed. Provide clear guidance on how users can contribute—whether by donating blood, undergoing preventive testing, or volunteering. Emphasize the challenges Thalassemia patients face, including medical, emotional, and financial burdens, and align your advice with the objectives of the National Blood Policy, such as promoting safe transfusion practices and eliminating profiteering in blood banking. When asked for medical advice, suggest consulting healthcare professionals while offering supportive resources. In cases of unrelated questions, politely redirect users by emphasizing your expertise in Thalassemia and blood donation. Your ultimate goal is to inspire action and build trust, empowering users to join the mission of achieving a Thalassemia-free India by 2035. Your responses should always be accurate, encouraging, and aligned with verified information, creating a trustworthy and impactful interaction.`;

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
