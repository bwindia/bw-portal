"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ChatMessages from "@/components/molecules/ChatMessages";
import { User } from "@nextui-org/react";

interface ChatHistoryProps {
  uniqueNumbers: { mobile: string; name: string; isBlocked: boolean }[];
}

export default function ChatHistory({ uniqueNumbers }: ChatHistoryProps) {
  const [selectedNumber, setSelectedNumber] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const supabase = createClient();

  const loadMessages = async (mobile: string) => {
    setSelectedNumber(mobile);
    const { data } = await supabase
      .from("tracker_chatbot_message")
      .select("*")
      .eq("mobile", mobile)
      .order("time_stamp", { ascending: true });

    setMessages(data || []);
  };

  return (
    <div className="flex flex-col md:flex-row h-[80vh] my-auto justify-center">
      <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r h-[30vh] md:h-full">
        <div className="divide-y w-full h-full">
          <div className="px-3 py-2">All Chats: {uniqueNumbers.length}</div>
          <div className="h-[calc(100%-40px)] w-full overflow-y-auto flex flex-col cursor-pointer divide-y">
            {uniqueNumbers.map(({ mobile, name, isBlocked }) => (
              <User
                key={mobile}
                description={`+${mobile.replace(/(\d{2})(\d{5})(\d{5})/, "$1 $2 $3")}`}
                className={`p-3 justify-start rounded-none hover:bg-gray-100 ${
                  selectedNumber === mobile ? "bg-gray-100" : ""
                } ${isBlocked ? "bg-red-100" : ""}`}
                name={name + (isBlocked ? " (Blocked)" : "")}
                onClick={() => loadMessages(mobile)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Chat area - full width on mobile, 3/4 on desktop */}
      <div className="flex-1 h-[50vh] md:h-full max-w-full md:max-w-[75%]">
        <ChatMessages messages={messages} selectedNumber={selectedNumber} />
      </div>
    </div>
  );
}
