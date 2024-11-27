import { AI_CONFIG, WHISPER_URL } from "@/lib/ai/config";

export const convertAudioToText = async (audioBuffer: ArrayBuffer) => {
  const formData = new FormData();
  formData.append(
    "file",
    new Blob([audioBuffer], { type: "audio/ogg" }),
    "audio.ogg"
  );
  formData.append("model", "whisper-1");
  const transcriptionResponse = await fetch(WHISPER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AI_CONFIG.OPENAI_API_KEY}`,
    },
    body: formData,
  });

  if (!transcriptionResponse.ok) {
    throw new Error("Failed to transcribe your audio, please try again later.");
  }

  const transcription = await transcriptionResponse.json();
  return transcription.text;
};

// import { SpeechClient } from '@google-cloud/speech';

// export const convertAudioToText = async (audioBuffer: ArrayBuffer) => {
//   const client = new SpeechClient();

//   const audio = {
//     content: Buffer.from(audioBuffer).toString('base64'),
//   };

//   const config = {
//     encoding: 'OGG_OPUS',
//     sampleRateHertz: 16000,
//     languageCode: 'en-US',
//   };

//   const request = {
//     audio: audio,
//     config: config,
//   };

//   const [response] = await client.recognize(request as any);
//   return response.results
//     ?.map(result => result.alternatives?.[0]?.transcript)
//     .join('\n');
// };
