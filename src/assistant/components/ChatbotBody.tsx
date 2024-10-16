import React from "react";
import { useContextData } from "@/assistant/context";
import ChatbotInput from "@/assistant/components/ChatbotInput";
import ChatbotSidebar from "@/assistant/components/ChatbotSidebar";
import MessageCard from "@/assistant/components/ChatbotMessage";

export default function ChatbotBody() {
  const [chatData] = useContextData();

  const chatBody = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex"
      ref={chatBody}
      style={{
        height: "calc(100% - 160px)"
      }}
    >
      <ChatbotSidebar />
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col flex-grow overflow-auto p-4">
          {chatData.messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              isLastApiMessage={
                message.role === "apiMessage" &&
                index === chatData.messages.length - 1
              }
            />
          ))}
        </div>
        <div className="p-4 border-t">
          <ChatbotInput />
        </div>
      </div>
    </div>
  );
}
