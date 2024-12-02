import React from "react";
import { useContextData } from "@/assistant/context";
import ChatbotInput from "@/assistant/components/ChatbotInput";
import ChatbotSidebar from "@/assistant/components/ChatbotSidebar";
import MessageCard from "@/assistant/components/ChatbotMessage";
import { Box, Divider } from "@mui/material";

export default function ChatbotBody(): JSX.Element {
  const [chatData] = useContextData();
  const chatBodyRef = React.useRef<HTMLDivElement>(null);

  return (
    <Box
      ref={chatBodyRef}
      sx={{
        display: "flex",
        flex: 1
      }}
    >
      {/* Sidebar */}
      {chatData.config.assistant.sidebar && <ChatbotSidebar />}

      {/* Main Chat Area */}
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 1 }}>
        {/* Messages List */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflowY: "auto",
            p: 2
          }}
        >
          {chatData.session?.chatMessages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
            />
          ))}
        </Box>

        {/* Divider between messages and input */}
        <Divider />

        {/* Chat Input Area */}
        <ChatbotInput />
      </Box>
    </Box>
  );
}
