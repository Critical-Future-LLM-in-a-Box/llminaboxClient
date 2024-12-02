import React, { useState } from "react";
import { Button, TextareaAutosize, IconButton, Box } from "@mui/material";
import { Mic, Stop, Delete, Image, UploadFile } from "@mui/icons-material";
import { sendMessage } from "@/assistant/utils/getMessage";
import { useContextData } from "@/assistant/context";
import { Message } from "@/assistant/types";
import {
  startAudioRecording,
  stopAudioRecording
} from "@/assistant/utils/getVoiceRecord";

export default function ChatbotInput() {
  const [chatData, dispatch] = useContextData();

  const [userMessage, setUserMessage] = useState("");
  const [userUploads, setUserUploads] = useState<Message["uploads"]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userMessage && userUploads?.length === 0) return;
    sendMessage(userMessage, chatData, dispatch, userUploads);
    setUserMessage("");
    setUserUploads([]);
  };

  const handleStartRecording = async () => {
    const onRecordingStart = () => setIsRecording(true);
    const onError = () =>
      dispatch({ type: "SET_ERROR", payload: "Unsupported browser" });

    await startAudioRecording(onRecordingStart, onError, () => {});
  };

  const handleStopRecording = async () => {
    await stopAudioRecording(async (blob) => {
      setIsRecording(false);
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const audioUpload = {
          name: `audio.${blob.type.split("/")[1]}`,
          data: reader.result as string,
          type: "audio",
          mime: blob.type
        };
        setUserUploads((prev = []) => [
          ...prev.filter((u) => u.type !== "audio"),
          audioUpload
        ]);
      };
    });
  };

  const handleUpload = (files: FileList, type: string) => {
    const uploads = Array.from(files).map((file) => ({
      name: file.name,
      data: URL.createObjectURL(file),
      type,
      mime: file.type
    }));
    setUserUploads((prevUploads) => [...prevUploads, ...uploads]);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2
      }}
    >
      {/* Upload Preview */}
      {userUploads.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
          {userUploads?.map((upload, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {upload.type === "audio" ? (
                <audio
                  controls
                  src={upload.data}
                >
                  <track kind="captions" />
                </audio>
              ) : upload.mime?.includes("image") ? (
                <Box
                  component="img"
                  src={upload.data}
                  alt={upload.name}
                  sx={{
                    height: 80,
                    width: 80,
                    objectFit: "cover",
                    borderRadius: 1
                  }}
                />
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
              <IconButton
                onClick={() =>
                  setUserUploads((uploads) =>
                    uploads?.filter((_, i) => i !== index)
                  )
                }
              >
                <Delete color="error" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Input and Action Buttons */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 1 }}>
        <TextareaAutosize
          value={userMessage}
          disabled={
            !chatData.api.online || chatData.api.isApiTyping || isRecording
          }
          placeholder="Type your message..."
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }
          }}
          style={{
            minHeight: 16,
            resize: "none",
            padding: "8px",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc"
          }}
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            disabled={
              !chatData.api.online ||
              chatData.api.isApiTyping ||
              !chatData.api.isApiAcceptingVoice
            }
          >
            {isRecording ? <Stop color="error" /> : <Mic />}
          </IconButton>

          <IconButton
            component="label"
            disabled={
              !chatData.api.online ||
              chatData.api.isApiTyping ||
              !chatData.api.isApiAcceptingImage
            }
          >
            <Image />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleUpload(e.target.files as FileList, "file")}
            />
          </IconButton>

          <IconButton
            component="label"
            disabled={
              !chatData.api.online ||
              chatData.api.isApiTyping ||
              !chatData.api.isApiAcceptingFile
            }
          >
            <UploadFile />
            <input
              type="file"
              multiple
              accept=".csv, .docx, .json, .pdf, .txt"
              hidden
              onChange={(e) => handleUpload(e.target.files as FileList, "file")}
            />
          </IconButton>

          <Button
            type="submit"
            variant="outlined"
            disabled={
              !chatData.api.online ||
              chatData.api.isApiTyping ||
              (!userMessage && !userUploads?.length)
            }
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
