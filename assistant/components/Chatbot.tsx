import React, { useEffect, useCallback } from "react";
import { useContextData } from "@/assistant/context";
import { getOnlineStatus } from "@/assistant/utils/getOnlineStatus";
import { getAllowedUploads } from "@/assistant/utils/getAllowedUploads";
import ChatbotHeader from "@/assistant/components/ChatbotHeader";
import ChatbotBody from "@/assistant/components/ChatbotBody";
import ChatbotFooter from "@/assistant/components/ChatbotFooter";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Chatbot(): JSX.Element {
  const [chatData, dispatch] = useContextData();

  const width = chatData.config.width
    ? chatData.config.width.includes("px")
      ? chatData.config.width
      : chatData.config.width + "px"
    : "100vw";
  const height = chatData.config.height
    ? chatData.config.height.includes("px")
      ? chatData.config.height
      : chatData.config.height + "px"
    : "100vh";

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
        width: width,
        height: height
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
