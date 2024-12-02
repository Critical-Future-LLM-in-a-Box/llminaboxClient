import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { HeaderAvatar } from "@/assistant/components/HeaderAvatar";
import { useContextData } from "@/assistant/context";

interface ChatbotHeaderProps {
  onClose?: () => void;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
}

export default function ChatbotHeader({
  onClose,
  onToggleFullscreen,
  isFullscreen = false
}: ChatbotHeaderProps): JSX.Element {
  const [chatData] = useContextData();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
        bgcolor: chatData.config.ui?.backgroundColor,
        color: chatData.config.ui?.foregroundColor,
        borderBottom: 1,
        borderColor: "divider"
      }}
    >
      {/* Assistant Avatar and Name */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <HeaderAvatar />
        <Typography variant="h6">{chatData.config.assistant?.name}</Typography>
      </Box>

      {/* Fullscreen and Close Buttons (conditionally rendered) */}
      {(onClose || onToggleFullscreen) && (
        <Box sx={{ display: "flex", gap: 1 }}>
          {onToggleFullscreen && (
            <IconButton
              onClick={onToggleFullscreen}
              sx={{ color: "inherit" }}
            >
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          )}
          {onClose && (
            <IconButton
              onClick={onClose}
              sx={{ color: "inherit" }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
}
