import React, { useState } from "react";
import { Button, TextareaAutosize, IconButton } from "@mui/material";
import { Mic, Stop, Delete, Image, UploadFile } from "@mui/icons-material";
import { sendMessage } from "@/assistant/utils/getMessage";
import { useContextData, Message } from "@/assistant/context";
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

    sendMessage(userMessage, chatData, dispatch, userUploads);

    setUserMessage("");

    resetUploadState();
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(e.target.value);
  };

  const resetUploadState = () => {
    setUserUploads([]);
  };

  const handleStartRecording = async () => {
    await startAudioRecording(
      (isStarted) => setIsRecording(isStarted),
      () => dispatch({ type: "SET_ERROR", payload: "Unsupported browser" }),
      () => {}
    );
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    await stopAudioRecording(async (blob) => {
      setIsRecording(false);
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const audioToUpload = {
          name: `audio.${blob.type.split("; ")[0].split("/")[1]}`,
          data: reader.result as string,
          type: "audio",
          mime: `${blob.type.split("; ")[0]}`
        };
        setUserUploads([
          ...(userUploads?.filter((upload) => upload.type !== "audio") || []),
          audioToUpload
        ]);
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageUploads = files.map((file) => ({
      name: file.name,
      data: URL.createObjectURL(file),
      type: "file",
      mime: file.type
    }));

    setUserUploads((prevUploads) => [...(prevUploads || []), ...imageUploads]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileUploads = files.map((file) => ({
      name: file.name,
      data: URL.createObjectURL(file),
      type: "file",
      mime: file.type
    }));

    setUserUploads((prevUploads) => [...(prevUploads || []), ...fileUploads]);
  };

  return (
    <form
      className="flex flex-wrap items-center justify-evenly gap-2 w-full"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-center w-full">
        {userUploads?.length ? (
          <div className="flex items-center justify-center m-2">
            {userUploads.map((upload, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-2"
              >
                {upload.type === "audio" && (
                  <audio
                    controls
                    src={upload.data}
                  >
                    <track kind="captions" />
                  </audio>
                )}
                {upload.type === "file" && upload.mime.includes("image") && (
                  <img
                    className="h-20 w-20 object-cover"
                    src={upload.data}
                    alt={upload.name}
                  />
                )}
                {upload.type === "file" && (
                  <div className="p-2 border border-gray-300 rounded">
                    {upload.name}
                  </div>
                )}
                <IconButton
                  onClick={() => {
                    setUserUploads(userUploads?.filter((_, i) => i !== index));
                  }}
                >
                  <Delete color="error" />
                </IconButton>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 justify-center items-center">
        <TextareaAutosize
          value={userMessage}
          disabled={!chatData.online || chatData.isApiTyping || isRecording}
          placeholder="Type your message..."
          className="resize-none flex justify-center items-center w-full min-w-[200px] p-2"
          onChange={handleMessageChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }
          }}
        />
      </div>

      <div className="flex flex-nowrap justify-center items-center gap-2 p-2">
        <IconButton
          onClick={isRecording ? handleStopRecording : handleStartRecording}
          disabled={
            !chatData.online ||
            chatData.isApiTyping ||
            !chatData.isApiAcceptingVoice
          }
        >
          {isRecording ? <Stop color="error" /> : <Mic />}
        </IconButton>
        <IconButton
          component="label"
          disabled={
            !chatData.online ||
            chatData.isApiTyping ||
            !chatData.isApiAcceptingImage
          }
        >
          <Image />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </IconButton>

        <IconButton
          component="label"
          disabled={
            !chatData.online ||
            chatData.isApiTyping ||
            !chatData.isApiAcceptingFiles
          }
        >
          <UploadFile />
          <input
            type="file"
            multiple
            accept=".csv, .docx, .json, .pdf, .txt"
            hidden
            onChange={handleFileUpload}
          />
        </IconButton>

        <Button
          type="submit"
          variant="outlined"
          disabled={
            !chatData.online ||
            chatData.isApiTyping ||
            (!userMessage && !userUploads?.length)
          }
        >
          Send
        </Button>
      </div>
    </form>
  );
}
