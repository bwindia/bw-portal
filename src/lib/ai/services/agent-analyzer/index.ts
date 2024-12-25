import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { MessageAgent } from "@/utils/types/whatsapp";
import {
  TRAINING_DATA,
  GREETING_PATTERNS,
  BLOOD_BRIDGE_PATTERNS,
  QUESTION_PATTERNS,
} from "@/lib/ai/config/data";
import { AI_CONFIG } from "@/lib/ai/config";

// Singleton instance
let instance: {
  embeddings: OpenAIEmbeddings;
  vectorstore: FaissStore;
  classifier?: RunnableSequence;
} | null = null;

export const initializeAnalyzer = async (openAIApiKey: string) => {
  if (!instance) {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey,
      modelName: AI_CONFIG.OPENAI_EMBEDDING_MODEL,
    });

    const vectorstore = await initializeVectorstore(embeddings);

    // Setup LangChain classifier chain
    const classifierPrompt = PromptTemplate.fromTemplate(`
      Classify the following message into one of these categories:
      - GREETING: Welcome messages
      - BLOOD_BRIDGE: Blood donation requests or blood-related queries
      - FAQ: Questions about Thalassemia, blood donation, or Blood Warriors NGO
      - BOUNCER: Irrelevant or random messages

      Message: {input}
      Category:
    `);

    const classifier = RunnableSequence.from([
      classifierPrompt,
      new ChatOpenAI({
        modelName: AI_CONFIG.OPENAI_35_MODEL,
        temperature: 0.3,
        maxTokens: 10,
      }),
      new StringOutputParser(),
    ]);

    instance = { embeddings, vectorstore, classifier };
  }
  return instance;
};

const initializeVectorstore = async (
  embeddings: OpenAIEmbeddings
): Promise<FaissStore> => {
  const documents = TRAINING_DATA.map(
    (data) =>
      new Document({
        pageContent: data.text,
        metadata: { agent: data.agent },
      })
  );

  return await FaissStore.fromDocuments(documents, embeddings);
};

const matchesPatterns = (text: string, patterns: RegExp[]): boolean => {
  return patterns.some((pattern) => pattern.test(text));
};

export const analyzeAgentForMessage = async (
  message: string
): Promise<MessageAgent> => {
  if (!instance) {
    throw new Error("Analyzer not initialized");
  }

  try {
    // First, check for quick pattern matches
    if (matchesPatterns(message, GREETING_PATTERNS)) {
      return MessageAgent.GREETING;
    }

    if (matchesPatterns(message, BLOOD_BRIDGE_PATTERNS)) {
      return MessageAgent.BLOOD_BRIDGE;
    }

    if (
      matchesPatterns(message, QUESTION_PATTERNS) ||
      message.toLowerCase().includes("what") ||
      message.toLowerCase().includes("how") ||
      message.toLowerCase().includes("why") ||
      message.toLowerCase().includes("tell me about")
    ) {
      return MessageAgent.FAQ;
    }

    // For more complex queries, use the vector similarity search
    const results = await instance.vectorstore.similaritySearchWithScore(
      message,
      2
    );

    if (results.length) {
      const [topMatch] = results;
      const [topDoc, topScore] = topMatch;
      if (topScore > 0.6) {
        return topDoc.metadata.agent as MessageAgent;
      }
    }
    // For ambiguous cases, use LangChain classifier
    if (instance.classifier) {
      const classification = await instance.classifier.invoke({
        input: message,
      });

      const result = classification.trim().toUpperCase();

      switch (result) {
        case "GREETING":
          return MessageAgent.GREETING;
        case "BLOOD_BRIDGE":
          return MessageAgent.BLOOD_BRIDGE;
        case "FAQ":
          return MessageAgent.FAQ;
        default:
          return MessageAgent.BOUNCER;
      }
    }

    return MessageAgent.BOUNCER;
  } catch (error) {
    console.error("Error analyzing message:", error);
    return MessageAgent.BOUNCER;
  }
};
