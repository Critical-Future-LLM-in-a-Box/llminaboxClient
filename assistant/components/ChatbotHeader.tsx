import React, { useState, useEffect, ReactNode } from "react";
import color from "color";
import { Button, ButtonGroup, Modal, Box, Typography } from "@mui/material";
import { HeaderAvatar } from "@/assistant/components/Avatar";
import { useContextData } from "@/assistant/context";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

export default function ChatbotHeader(): JSX.Element {
  const [chatData, dispatch] = useContextData();
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    {
      role: ReactNode;
      content: ReactNode;
      createdDate: string | number | Date;
      id: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isHistoryModalOpen) {
      setLoading(true);
      const fetchChatHistory = async () => {
        const authToken = btoa("adam:acbb6161-87e7-459c-beca-26235a7e6a30");
        try {
          const response = await fetch(
            `https://llm.criticalfutureglobal.com/api/v1/chatmessage/${chatData.config.chatflowid}`,
            {
              method: "GET",
              headers: {
                "Authorization": `Basic ${authToken}`,
                "Content-Type": "application/json"
              }
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch chat history.");
          }
          const data = await response.json();
          setChatHistory(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };

      fetchChatHistory();
    }
  }, [isHistoryModalOpen]);

  return (
    <>
      <div
        className="flex flex-row items-center justify-between border shadow-sm p-4 h-[80px]"
        style={{
          backgroundColor: color(chatData.config.themeColor)
            .darken(0.03)
            .string(),
          color: color(chatData.config.textColor).darken(0.05).string()
        }}
      >
        <HeaderAvatar />

        <ButtonGroup>
          <Button
            variant="outlined"
            onClick={() => setHistoryModalOpen(true)}
          >
            History
          </Button>

          <Button
            variant="outlined"
            style={{
              color: chatData.config.chatMemory ? undefined : "red"
            }}
            onClick={() => {
              dispatch({
                type: "SET_CHAT_MEMORY",
                payload: !chatData.config.chatMemory
              });
            }}
            endIcon={chatData.config.chatMemory ? <CheckIcon /> : <CloseIcon />}
          >
            <span>Memory</span>
          </Button>

          <Button
            variant="outlined"
            onClick={() =>
              dispatch({
                type: "CLEAR_CHAT",
                payload: ""
              })
            }
          >
            Clear
          </Button>
        </ButtonGroup>
      </div>

      <Modal
        open={isHistoryModalOpen}
        onClose={() => setHistoryModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            width: "600px",
            height: "400px",
            overflowY: "auto",
            overflowX: "hidden"
          }}
        >
          <Typography
            variant="h6"
            component="h2"
          >
            Chat History
          </Typography>
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : chatHistory.length ? (
              chatHistory.map((message) => (
                <div key={message.id}>
                  <strong>{message.role}:</strong> {message.content} <br />
                  <small>
                    {new Date(message.createdDate).toLocaleString()}
                  </small>
                </div>
              ))
            ) : (
              <div>No chat history available.</div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}
