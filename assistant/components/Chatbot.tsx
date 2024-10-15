import React, { useEffect } from "react";
import { useContextData } from "@/assistant/context";
import { getOnlineStatus } from "@/assistant/utils/getOnlineStatus";
import { getAllowedUploads } from "@/assistant/utils/getAllowedUploads";
import ChatbotHeader from "@/assistant/components/ChatbotHeader";
import ChatbotBody from "@/assistant/components/ChatbotBody";
import ChatbotFooter from "@/assistant/components/ChatbotFooter";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// General Chatbot component
interface ChatbotProps {
  width?: string; // Width of the chatbot (default is 100%)
  height?: string; // Height of the chatbot (default is 100%)
}

export default function Chatbot({
  width = "100%",
  height = "100%"
}: ChatbotProps): JSX.Element {
  const [chatData, dispatch] = useContextData();

  const resolvedWidth = width.includes("px") ? width : `${width}px`;
  const resolvedHeight = height.includes("px") ? height : `${height}px`;

  useEffect(() => {
    if (chatData.error) {
      toast.error(chatData.error);
      dispatch({
        type: "SET_ERROR",
        payload: ""
      });
    }
  }, [chatData.error]);

  useEffect(() => {
    getOnlineStatus(chatData, dispatch);
    getAllowedUploads(chatData, dispatch);
  }, [chatData, dispatch]);

  return (
    <div
      className="flex flex-col rounded-lg"
      style={{
        backgroundColor: chatData.config.themeColor,
        color: chatData.config.textColor,
        width: resolvedWidth,
        height: resolvedHeight
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        theme="colored"
      />
      <ChatbotHeader />
      <ChatbotBody />
      <ChatbotFooter />
    </div>
  );
}
