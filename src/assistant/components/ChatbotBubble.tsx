import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChatbotHeader from "@/assistant/components/ChatbotHeader";
import ChatbotBody from "@/assistant/components/ChatbotBody";
import ChatbotFooter from "@/assistant/components/ChatbotFooter";
import { useContextData } from "@/assistant/context";

export default function ChatbotBubble(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleChatbot = () => setIsVisible(!isVisible);
  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);
  const closeChatbot = () => setIsVisible(false);

  const [chatData] = useContextData();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "end",
        gap: 1
      }}
    >
      {isVisible && (
        <Box
          sx={{
            position: isFullscreen ? "fixed" : "relative",
            bottom: isFullscreen ? "50%" : 16,
            right: isFullscreen ? "50%" : 16,
            transform: isFullscreen ? "translate(50%, 50%)" : "none",
            minWidth: isFullscreen ? "60vw" : "300px",
            maxWidth: isFullscreen ? "80vw" : "400px",
            minHeight: isFullscreen ? "60vh" : "300px",
            maxHeight: isFullscreen ? "80vh" : "600px",
            boxShadow: 4,
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <ChatbotHeader
            onClose={closeChatbot}
            onToggleFullscreen={toggleFullscreen}
            isFullscreen={isFullscreen}
          />
          <ChatbotBody />
          <ChatbotFooter />
        </Box>
      )}

      <Button
        onClick={toggleChatbot}
        sx={{
          "bgcolor": chatData.config.ui?.backgroundColor,
          "color": chatData.config.ui?.foregroundColor,
          "width": 64,
          "height": 64,
          "borderRadius": "50%",
          "boxShadow": 6,
          "&:hover": {
            color: chatData.config.ui?.backgroundColor,
            bgcolor: chatData.config.ui?.foregroundColor
          }
        }}
      >
        {isVisible ? <KeyboardArrowDownIcon /> : <ChatIcon />}
      </Button>
    </Box>
  );
}
