import React, { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { ContextProvider } from "@/assistant/context";
import Chatbot from "@/assistant/components/Chatbot";

export const initConfig = {
  apiHost: "https://llm.criticalfutureglobal.com",
  chatflowid: "95e01dd4-ff2f-4055-a6f1-3cfc35261831",
  sessionid:
    localStorage.getItem("sessionid") ??
    Math.random().toString().substring(2, 12),
  name: "Mai",
  description: "Critical Future Chatbot Assistant",
  voiceName: "en-GB-SoniaNeural",
  avatarStaticUrl:
    "https://raw.githubusercontent.com/Critical-Future-LLM-in-a-Box/llminaboxchatbots/main/Avatars/mai/mai.png",
  avatarLiveUrl:
    "https://raw.githubusercontent.com/Critical-Future-LLM-in-a-Box/llminaboxchatbots/main/Avatars/mai/mai-new.gif",
  avatarVideoUrl:
    "https://github.com/Critical-Future-LLM-in-a-Box/llminaboxchatbots/raw/main/Avatars/mai/Mai%20intro%20V0.2%20(sonia%20voice).mp4",
  themeColor: "#F8F8FF",
  textColor: "#000000",
  chatMemory: true,
  width: "",
  height: ""
};

export default function ChatbotBubble(): JSX.Element {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  return (
    <>
      {/* Floating Button to Open Chatbot */}
      {!isChatbotVisible && (
        <button
          onClick={toggleChatbot}
          className="fixed bottom-10 right-10 bg-blue-500 rounded-full shadow-lg text-white w-16 h-16 flex items-center justify-center z-50"
        >
          <ChatIcon
            className="text-white"
            fontSize="large"
          />
        </button>
      )}

      {/* Assistant Modal */}
      {isChatbotVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
            <div className="flex justify-center items-center bg-blue-500 p-3 text-white font-bold rounded-t-lg">
              Chatbot Assistant
              <button
                onClick={toggleChatbot}
                className="flex ju items-center absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="w-full h-full">
              <ContextProvider initConfig={initConfig}>
                <Chatbot
                  width="100%"
                  height="100%"
                />
              </ContextProvider>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
