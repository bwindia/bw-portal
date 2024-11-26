
// Add this import at the top with other imports
// import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
// import { Document } from 'langchain/document';
// import { FaissStore } from 'langchain/vectorstores/faiss';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Document } from '@langchain/core/documents';
import { FaissStore } from '@langchain/community/vectorstores/faiss';
import { TRAINING_DATA } from "@/lib/ai/config/data";
import { MessageAgent } from "@/utils/types/whatsapp";

// Singleton instance for the analyzer
let instance: {
  embeddings: OpenAIEmbeddings;
  vectorstore: FaissStore;
} | null = null;

export async function initializeAnalyzer(openAIApiKey: string) {
  if (!instance) {
    const embeddings = new OpenAIEmbeddings({ openAIApiKey,
      modelName: "text-embedding-3-small"
     });
    const vectorstore = await initializeVectorstore(embeddings);
    instance = { embeddings, vectorstore };
  }
  return instance;
}

async function initializeVectorstore(
  embeddings: OpenAIEmbeddings
): Promise<FaissStore> {
  const trainingData = TRAINING_DATA;
  
  const documents = trainingData.map(
    (data) =>
      new Document({ pageContent: data.text, metadata: { agent: data.agent } })
  );

  const vectorstore = await FaissStore.fromDocuments(documents, embeddings);
  return vectorstore;
}

export async function analyzeAgentForMessage(
  message: string
): Promise<MessageAgent> {
  if (!instance) {
    throw new Error("Analyzer not initialized");
  }

  try {
    const results = await instance.vectorstore.similaritySearchVectorWithScore(
      await instance.embeddings.embedQuery(message),
      1
    );

    if (!results.length) {
      return MessageAgent.BOUNCER;
    }

    return results[0][0].metadata.agent as MessageAgent;
  } catch (error) {
    console.error("Error analyzing message:", error);
    return MessageAgent.BOUNCER;
  }
}
// import { MessageAgent } from "@/utils/types/whatsapp";

// export const analyzeAgentForMessage = async (
//   message: string
// ): Promise<MessageAgent> => {
//   // Implement your intent analysis logic here
//   // You could use OpenAI, Azure Language Understanding, or custom logic

//   const lowerMessage = message.toLowerCase();

//   if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
//     return MessageAgent.GREETING;
//   }

//   if (lowerMessage.includes("schedule") && lowerMessage.includes("donation")) {
//     return MessageAgent.BLOOD_BRIDGE;
//   }

//   if (
//     lowerMessage.includes("what") ||
//     lowerMessage.includes("how") ||
//     lowerMessage.includes("?")
//   ) {
//     return MessageAgent.FAQ;
//   }

//   return MessageAgent.BOUNCER;
// };

// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// import { Document } from "langchain/document";
// import { FaissStore } from "langchain/vectorstores/faiss";
// import { GREETING_TEMPLATES, BLOOD_BRIDGE_TEMPLATES } from "./constants";
// import { ChatResponse, UserRole } from "../types";

// export class ChatbotClassifier {
//   private embeddings: OpenAIEmbeddings;
//   private vectorstore: FaissStore;

//   constructor(openaiApiKey: string) {
//     this.embeddings = new OpenAIEmbeddings({ openAIApiKey: openaiApiKey });
//     this.vectorstore = this.initializeVectorstore();
//   }

//   private async initializeVectorstore(): Promise<FaissStore> {
//     const trainingData =

//     const documents = trainingData.map(
//       (data) =>
//         new Document({
//           pageContent: data.text,
//           metadata: { agent: data.agent },
//         })
//     );

//     return await FaissStore.fromDocuments(documents, this.embeddings);
//   }

//   async classifyAndRespond(
//     userQuery: string,
//     userRole: UserRole,
//     context: string = ""
//   ): Promise<ChatResponse> {
//     if (!userQuery.trim()) {
//       return {
//         agent: "bouncer",
//         message: "Please provide a question or request.",
//       };
//     }

//     try {
//       const queryEmbedding = await this.embeddings.embedQuery(userQuery);
//       const results = await this.vectorstore.similaritySearchVectorWithScore(
//         queryEmbedding,
//         1
//       );

//       if (!results.length) {
//         return {
//           agent: "bouncer",
//           message:
//             "I'm sorry, I couldn't understand your query. Please try asking about Thalassemia or blood donation.",
//         };
//       }

//       const [match] = results;
//       const matchedAgent = match[0].metadata.agent;

//       switch (matchedAgent) {
//         case "blood_bridge":
//           const applicableTemplates = BLOOD_BRIDGE_TEMPLATES.filter((tmpl) =>
//             tmpl.user_roles_mapped.includes(userRole)
//           );

//           if (!applicableTemplates.length) {
//             return {
//               agent: "blood_bridge",
//               message:
//                 "I apologize, but I don't have a suitable template for your user role.",
//             };
//           }

//           const selectedTemplate = applicableTemplates[0];
//           return {
//             agent: "blood_bridge",
//             template: selectedTemplate.template_name,
//             message: `Processing your request using ${selectedTemplate.template_name}`,
//           };

//         case "greeting":
//           return {
//             agent: "greeting",
//             message:
//               GREETING_TEMPLATES[userRole] ||
//               "Hello! How can we assist you today?",
//           };

//         case "bouncer":
//           return {
//             agent: "bouncer",
//             message:
//               "I can only assist with questions about Thalassemia and blood donation. Please rephrase your question.",
//           };

//         default:
//           return {
//             agent: matchedAgent,
//             message: "How else can I assist you today?",
//           };
//       }
//     } catch (error) {
//       return {
//         agent: "error",
//         message:
//           "I encountered an error processing your request. Please try again.",
//         error: error instanceof Error ? error.message : String(error),
//       };
//     }
//   }
// }
