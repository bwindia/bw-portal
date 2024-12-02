import { createClient } from "@/lib/supabase/server";

export const trackDonorCall = async (donor: { user_id: string }) => {
  const supabase = createClient();
  const { data, error } = await supabase.from("tracker_donor_calls").insert({
    user_id: donor.user_id,
    last_contacted_date: new Date().toISOString(),
    dnd_status_id: 1,
    comments: "Contacted through WhatsApp chatbot",
  });
  if (error) {
    throw new Error(
      "We failed to track donor call. Please contact support and track them manually to avoid spamming the donors."
    );
  }
  return data;
};
