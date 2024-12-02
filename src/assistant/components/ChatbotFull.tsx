import React from "react";
import { Box } from "@mui/material";
import ChatbotHeader from "@/assistant/components/ChatbotHeader";
import ChatbotBody from "@/assistant/components/ChatbotBody";
import ChatbotFooter from "@/assistant/components/ChatbotFooter";

export default function ChatbotFull(): JSX.Element {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <ChatbotHeader />
      <ChatbotBody />
      <ChatbotFooter />
    </Box>
  );
}
