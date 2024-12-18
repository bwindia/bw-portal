import { AI_CONFIG } from '@/lib/ai/config';

export const convertAudioToText = async (audioBuffer: ArrayBuffer) => {
  const formData = new FormData();
  formData.append(
    "file",
    new Blob([audioBuffer], { type: "audio/ogg" }),
    "audio.ogg"
  );
  formData.append("model", "whisper-1");
  const transcriptionResponse = await fetch(AI_CONFIG.WHISPER_URL, {
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
