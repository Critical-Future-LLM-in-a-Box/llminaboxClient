import React from "react";
import { Avatar } from "@mui/material";
import { useContextData } from "@/assistant/context";

export function HeaderAvatar(): JSX.Element {
  const [chatData] = useContextData();

  return (
    <Avatar
      alt={chatData.config.assistant?.name}
      src={chatData.config.assistant?.avatar?.staticUrl}
      sx={{
        width: 32,
        height: 32,
        color: chatData.config.ui?.foregroundColor,
        bgcolor: chatData.config.ui?.backgroundColor
      }}
    />
  );
}
