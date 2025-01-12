import { ORGANIZATION_NAME } from "@/utils/constants";
import Image from "next/image";
import React, { useRef, useEffect } from "react";
import logo from "@/app/icon.png";
import { Chip } from "@nextui-org/react";

interface Message {
  message: string;
  response: string;
  mobile: string;
  time_stamp: string;
  agent: string;
  message_type: string;
}

interface ChatMessagesProps {
  messages: Message[];
  selectedNumber: string;
}

const getAgentConfig = (
  agent: string
): {
  color: "primary" | "secondary" | "success" | "warning" | "danger";
  label: string;
} => {
  switch (agent.toLowerCase()) {
    case "blood_bridge":
      return { color: "primary", label: "template" };
    case "faq":
      return { color: "primary", label: "Faq" };
    case "greeting":
      return { color: "primary", label: "welcome" };
    case "error-na":
      return { color: "danger", label: "unknown" };
    case "business_initiated":
      return { color: "warning", label: "system" };
    default:
      return { color: "primary", label: agent };
  }
};

const renderMessage = (msg: Message) => {
  switch (msg.message_type?.toLowerCase()) {
    case "audio":
      return (
        <div className="flex items-center gap-2">
          <span className="material-symbols-rounded">audio_file</span>
        </div>
      );

    case "button":
      return (
        <div className="flex flex-col gap-2 min-w-[200px]">
          <span className="italic w-full border-l-3 border-primary p-2 bg-primary/10 rounded-r-md text-xs">
            Button reply
          </span>
          <span className="text-sm">{JSON.parse(msg.message).text}</span>
        </div>
      );

    case "interactive":
      return (
        <div className="flex flex-col gap-2 min-w-[200px]">
          <span className="italic w-full border-l-2 border-primary p-2 bg-primary/10 rounded-r-md text-xs flex items-center gap-2">
            <span className="material-symbols-rounded text-default-500">
              description
            </span>
            Form Details
          </span>
          {/* <span className="text-sm">{JSON.parse(msg.message)}</span> */}
        </div>
      );

    case "image":
      return (
        <div className="flex items-center gap-2 text-foreground/30">
          <span className="material-symbols-rounded">image</span>
          <span className="text-xs">Image sent</span>
        </div>
      );
    case "text":
      return <p className="text-sm">{msg.message}</p>;

    default:
      return (
        <div className="flex items-center gap-2 text-foreground/30 overflow-hidden">
          <span className="material-symbols-rounded text-danger">report</span>
          <span className="text-xs">
            Unknown: {msg.message_type}
            Message: {msg.message}
          </span>
        </div>
      );
  }
};

// const renderResponse = (msg: Message) => {
//   switch (msg.message_type?.toLowerCase()) {
//     case 'audio':
//       return (
//         <div className="flex items-center gap-2">
//           <span className="material-symbols-rounded">audio_file</span>
//           <audio controls className="max-w-full h-8">
//             <source src={msg.response} type="audio/mpeg" />
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       );

//     case 'image':
//       return (
//         <div className="relative">
//           <Image
//             src={msg.response}
//             alt="Image response"
//             width={200}
//             height={200}
//             className="rounded-md"
//           />
//         </div>
//       );

//     default:
//       return <p className="text-sm">{msg.response}</p>;
//   }
// };

export default function ChatMessages({
  messages,
  selectedNumber,
}: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!selectedNumber) {
    return (
      <div className="h-full flex gap-4 items-center justify-center text-gray-500 space-y-4">
        <Image
          src={logo}
          alt="logo"
          width={75}
          height={75}
          className="rounded-full border-2 border-foreground/15 p-2 object-cover"
        />
        <div className="flex flex-col gap-1">
          <div className="text-xl font-bold flex items-center gap-1">
            <span>{ORGANIZATION_NAME}</span>
            <span className="material-symbols-rounded text-white bg-blue-500 rounded-full">
              check
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Select a conversation to start
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#e5ded8] p-2 md:p-4 overflow-y-auto">
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex flex-col space-y-4">
            {/* User message */}
            {msg.agent !== "BUSINESS_INITIATED" && (
              <div className="flex justify-end">
                <div className="bg-[#dcf8c6] max-w-[85%] md:max-w-[70%] rounded-lg p-2 md:p-3 shadow break-words whitespace-pre-wrap">
                  {renderMessage(msg)}
                  <p className="text-right text-[10px] md:text-xs text-gray-500">
                    {new Date(msg.time_stamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            )}

            {/* Bot response */}
            <div className="flex justify-start">
              <div className="relative bg-white max-w-[85%] md:max-w-[70%] rounded-lg p-2 md:p-3 shadow break-words whitespace-pre-wrap">
                {msg.agent && (
                  <Chip
                    color={getAgentConfig(msg.agent).color}
                    variant="shadow"
                    size="sm"
                    className="capitalize absolute -top-3 -right-3 text-[10px] md:text-xs"
                  >
                    {getAgentConfig(msg.agent).label}
                  </Chip>
                )}
                <p className="text-xs md:text-sm">{msg.response}</p>
                <p className="text-right text-[10px] md:text-xs text-gray-500">
                  {new Date(msg.time_stamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
