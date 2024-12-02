import React, { useState, useEffect } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { CircularProgress, Box, IconButton, Typography } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StopIcon from "@mui/icons-material/Stop";
import { useContextData } from "@/assistant/context";
import { Message } from "@/assistant/types";
import { getVoice } from "@/assistant/utils/getVoice";

export default function MessageCard({ message }: { message: Message }) {
  const [chatData, dispatch] = useContextData();
  const [isFetchingVoice, setIsFetchingVoice] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(
    null
  );

  const handleVoiceClick = async () => {
    if (isPlaying && audioInstance) {
      audioInstance.pause();
      setIsPlaying(false);
    } else {
      setIsFetchingVoice(true);
      try {
        const audio = await getVoice(chatData, message);
        if (audio) {
          setAudioInstance(audio);
          audio.play();
          setIsPlaying(true);
          audio.onended = () => setIsPlaying(false);
        }
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: (error as Error).message
        });
      } finally {
        setIsFetchingVoice(false);
      }
    }
  };

  const renderUploads = () =>
    message.uploads?.map((upload, index) => (
      <Box
        key={index}
        sx={{ mb: 1 }}
      >
        {upload.type === "file" && upload.mime?.startsWith("image") ? (
          <Box
            component="img"
            src={upload.data}
            alt={upload.name}
            sx={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: 1
            }}
          />
        ) : upload.type === "audio" ? (
          <Box
            component="audio"
            controls
            src={upload.data}
            sx={{ width: "100%" }}
          >
            <track kind="captions" />
          </Box>
        ) : (
          <Box
            sx={{
              p: 1,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
              typography: "body2"
            }}
          >
            {upload.name}
          </Box>
        )}
      </Box>
    ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: message.role === "apiMessage" ? "flex-start" : "flex-end",
        m: 1,
        width: "fit-content"
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          p: 2,
          borderRadius: 1,
          bgcolor: chatData.config.ui?.backgroundColor
        }}
      >
        {chatData.api.isApiTyping ? (
          <CircularProgress size={16} />
        ) : (
          <>
            <MessageMarkedWrapper content={message.content} />
            {(message.uploads?.length ?? 0) > 0 && (
              <Box sx={{ mt: 1 }}>{renderUploads()}</Box>
            )}
          </>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Typography variant="caption">
          {new Date(message.timestamp).toLocaleString()}
        </Typography>
        {message.role === "apiMessage" && (
          <IconButton
            onClick={handleVoiceClick}
            size="small"
          >
            {isFetchingVoice ? (
              <CircularProgress size={16} />
            ) : isPlaying ? (
              <StopIcon fontSize="small" />
            ) : (
              <VolumeUpIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

export function MessageMarkedWrapper({ content }: { content: string }) {
  const [sanitizedHtml, setSanitizedHtml] = useState<string>("");

  useEffect(() => {
    const sanitizeContent = async () => {
      const html = DOMPurify.sanitize(await marked(content));
      setSanitizedHtml(html);
    };
    sanitizeContent();
  }, [content]);

  return (
    <Box
      sx={{ typography: "body2" }}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
