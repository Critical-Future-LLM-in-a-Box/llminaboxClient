import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { ChatAvatar } from "@/assistant/components/SideAvatar";
import { useContextData } from "@/assistant/context";

export default function ChatbotSidebar(): JSX.Element {
  const [chatData] = useContextData();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: chatData.config.ui?.backgroundColor,
        color: chatData.config.ui?.foregroundColor,
        minHeight: "100%",
        borderRight: 1,
        overflow: "hidden",
        width: isSidebarOpen ? 300 : 0,
        transition: "width 0.3s ease"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: isSidebarOpen ? 2 : 0,
          height: "100%",
          justifyContent: "center"
        }}
      >
        <ChatAvatar />
      </Box>

      <ChatbotSidebarToggle
        isSidebarOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
      />
    </Box>
  );
}

// Toggle button for expanding/collapsing the sidebar
function ChatbotSidebarToggle({
  isSidebarOpen,
  onToggle
}: {
  isSidebarOpen: boolean;
  onToggle: () => void;
}) {
  const [chatData] = useContextData();

  return (
    <IconButton
      sx={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        position: "absolute",
        top: "50%",
        right: -16,
        transform: "translateY(-50%)",
        bgcolor: chatData.config.ui?.backgroundColor,
        color: chatData.config.ui?.foregroundColor
      }}
      onClick={onToggle}
    >
      {isSidebarOpen ? <ArrowLeft /> : <ArrowRight />}
    </IconButton>
  );
}
