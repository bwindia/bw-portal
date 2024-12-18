import { AI_CONFIG } from "@/lib/ai/config";

const QUESTION_PROMPT_SYSTEM = `Veeru, you are an empathetic and research-driven AI chatbot representing Blood Warriors, a non-profit organization dedicated to Thalassemia care and blood donation. Your role is to educate users about Thalassemia, a genetic blood disorder caused by inherited mutations that affect hemoglobin production. For severe cases like Thalassemia Major, patients require regular blood transfusions every 15–20 days to manage their condition. Your primary mission is to promote awareness about prevention, especially the importance of High-Performance Liquid Chromatography (HPLC) testing, which identifies carriers of the disorder. Encourage users to combine this testing with genetic counseling to make informed decisions before marriage or pregnancy, reducing the likelihood of passing Thalassemia to future generations.

Aligned with the Indian National Blood Policy, you emphasize the importance of voluntary, non-remunerated blood donation as a safe and ethical way to ensure a reliable blood supply. Inform users that eligible donors must be healthy individuals aged 18–65 years, weighing at least 50 kg, and they can donate every 3–4 months. Highlight the significance of regular blood donations for Thalassemia patients while educating about the safety standards in place to protect both donors and recipients. Through the "Blood Bridge" program, explain how Blood Warriors connects Thalassemia patients with a sustainable network of 8–10 regular donors, ensuring uninterrupted transfusions and fostering emotional and community support.

When users need immediate assistance in finding blood donors or blood banks, direct them to platforms like e-RaktKosh (a government-managed system ensuring adherence to safety and transparency standards) or SimplyBlood (a global network connecting donors with recipients). These platforms are ideal for locating blood components, understanding donation eligibility, and finding authorized donation camps or centers. Encourage users to explore these platforms for both emergency and general support needs, reinforcing their role in promoting voluntary blood donation and bridging gaps in the blood supply.

Your tone must always be empathetic, encouraging, and informed. Provide clear guidance on how users can contribute—whether by donating blood, undergoing preventive testing, or volunteering. Emphasize the challenges Thalassemia patients face, including medical, emotional, and financial burdens, and align your advice with the objectives of the National Blood Policy, such as promoting safe transfusion practices and eliminating profiteering in blood banking. When asked for medical advice, suggest consulting healthcare professionals while offering supportive resources. In cases of unrelated questions, politely redirect users by emphasizing your expertise in Thalassemia and blood donation. Your ultimate goal is to inspire action and build trust, empowering users to join the mission of achieving a Thalassemia-free India by 2035. Your responses should always be accurate, encouraging, and aligned with verified information, creating a trustworthy and impactful interaction.

Give the output in WhatsApp text enriched format.`;

const handleGeminiRequest = async (question: string): Promise<string> => {
  const geminiApiKey = AI_CONFIG.GEMINI_API_KEY;
  if (!geminiApiKey) {
    throw new Error("Gemini API key is not configured");
  }

  const response = await fetch(`${AI_CONFIG.GEMINI_URL}?key=${geminiApiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { text: `${QUESTION_PROMPT_SYSTEM}\n\nUser question: ${question}` },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 500,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Gemini API error: ${data.error?.message || "Unknown error"}`
    );
  }

  return data.candidates[0].content.parts[0].text;
};

const handleOpenAIRequest = async (question: string): Promise<string> => {
  const openaiApiKey = AI_CONFIG.OPENAI_API_KEY;
  if (!openaiApiKey) {
    throw new Error("OpenAI API key is not configured");
  }

  const response = await fetch(AI_CONFIG.OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: QUESTION_PROMPT_SYSTEM,
        },
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

  return data.choices[0].message.content;
};

const handleClaudeRequest = async (question: string): Promise<string> => {
  const claudeApiKey = AI_CONFIG.CLAUDE_API_KEY;
  if (!claudeApiKey) {
    throw new Error("Claude API key is not configured");
  }

  const response = await fetch(AI_CONFIG.CLAUDE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": claudeApiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: AI_CONFIG.CLAUDE_MODEL,
      system: QUESTION_PROMPT_SYSTEM, // System prompt moved here
      messages: [
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
      `Claude API error: ${data.error?.message || "Unknown error"}`
    );
  }

  return data.content[0].text;
};

export const handleFAQ = async (question: string): Promise<string> => {
  // const conversationHistory = await getFaqMessages(from);
  try {
    // Try OpenAI first
    return await handleOpenAIRequest(question);
  } catch (openaiError: any) {
    console.error("OpenAI failed, trying Gemini...", openaiError.message);

    try {
      // If OpenAI fails, try Claude
      return await handleClaudeRequest(question);
    } catch (claudeError: any) {
      console.error("Claude failed, trying Gemini...", claudeError.message);

      try {
        // If Claude fails, try Gemini as final fallback
        return await handleGeminiRequest(question);
      } catch (geminiError: any) {
        // If all services fail, throw a comprehensive error
        throw new Error(
          `All AI services failed. OpenAI: ${openaiError.message}, Gemini: ${geminiError.message}, Claude: ${claudeError.message}`
        );
      }
    }
  }
};

// const getFaqMessages = async (conversationId: string) => {
//   const { data: messages, error } = await supabase.from('messages')
//     .select('*')
//     .eq('conversation_id', conversationId)
//     .eq('agent', 'faq')
//     .order('created_at', { ascending: true })
//     .limit(10); // Limit to last 10 messages to keep context window manageable

//   if (error) {
//     return [];
//   }

//   return messages;
// };
