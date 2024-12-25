import axios from 'axios';
import { AI_CONFIG } from '@/lib/ai/config';

export const convertTextToSpeech = async (text: string): Promise<Buffer> => {
  try {
    const response = await axios.post(
      AI_CONFIG.OPENAI_SPEECH_URL,
      {
        model: AI_CONFIG.OPENAI_SPEECH_MODEL,
        input: text,
        voice: 'nova',
        response_format: 'opus',
      },
      {
        headers: {
          'Authorization': `Bearer ${AI_CONFIG.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    return Buffer.from(response.data);
  } catch (error) {
    console.error('Error in convertTextToSpeech:', error);
    throw new Error('Failed to convert text to speech');
  }
};