import { createClient } from "@/lib/supabase/server";

const getRecentMessages = async (mobile: string) => {
  const supabase = createClient();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startOfDay = today
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$2-$1");

  const { data: messages, error } = await supabase
    .from("tracker_chatbot_message")
    .select("*")
    .eq("mobile", mobile)
    .gte("insert_time", startOfDay)
    .order("insert_time", { ascending: true });

  if (error || !messages) {
    return [];
  }

  return messages;
};

export const getFaqMessages = async (mobile: string) => {
  const messages = await getRecentMessages(mobile);
  if (!messages) {
    return [];
  }
  const faqMessages = messages.filter(m => m.agent === "faq");
  return faqMessages;
};

export const isUserBlocked = async (mobile: string): Promise<boolean> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_data")
    .select("is_blocked")
    .eq("mobile", mobile)
    .single();

  if (error) {
    console.error("Error checking blocked user:", error);
    return false;
  }

  return data?.is_blocked || false;
};

