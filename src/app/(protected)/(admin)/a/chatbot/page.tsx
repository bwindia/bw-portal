import { createClient } from "@/lib/supabase/client";
import ChatHistory from "@/components/organisms/ChatHistory";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";

type ChatMessage = {
  mobile: string;
  latest_message: string;
  name: string;
  isBlocked: boolean;
};

export default async function ChatbotHistoryPage() {
  const supabase = createClient();

  // First get messages
  const { data: messages } = await supabase
    .from("tracker_chatbot_message")
    .select("mobile, time_stamp")
    .order("time_stamp", { ascending: false });

  // Then get user data
  const { data: userData } = await supabase
    .from("user_data")
    .select("mobile, name, isBlocked:is_blocked");

  // Combine the data
  const uniqueNumbers = (
    messages
      ? Object.values(
          messages.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.mobile]: {
                mobile: curr.mobile,
                latest_message: curr.time_stamp,
                name:
                  userData?.find((u) => u.mobile === curr.mobile)?.name ||
                  "Unknown",
                isBlocked:
                  userData?.find((u) => u.mobile === curr.mobile)?.isBlocked ||
                  false,
              },
            }),
            {}
          )
        )
      : []
  ) as ChatMessage[];

  return (
    <div className="">
      <Breadcrumbs />
      <ChatHistory uniqueNumbers={uniqueNumbers || []} />
    </div>
  );
}
