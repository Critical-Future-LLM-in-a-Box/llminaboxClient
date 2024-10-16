import React, { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { ContextProvider } from "@/assistant/context";
import Chatbot from "@/assistant/components/Chatbot";
import { Config } from "@/assistant/context";

interface ChatbotBubbleProps {
  initConfig: Config;
  position?: { bottom?: string; right?: string };
}

const ChatbotBubble: React.FC<ChatbotBubbleProps> = ({
  initConfig,
  position = { bottom: "20px", right: "20px" }
}) => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <ContextProvider initConfig={initConfig}>
      {/* Floating Button to Open Chatbot */}
      {!isChatbotVisible && (
        <button
          onClick={toggleChatbot}
          className="fixed bg-blue-500 rounded-full shadow-lg text-white w-16 h-16 flex items-center justify-center z-50"
          style={{ bottom: position.bottom, right: position.right }}
        >
          <ChatIcon
            className="text-white"
            fontSize="large"
          />
        </button>
      )}

      {/* Chatbot Modal */}
      {isChatbotVisible && (
        <div
          className={`fixed inset-0 ${
            isMaximized ? "flex items-center justify-center" : ""
          }`}
          style={{
            zIndex: 999999,
            backgroundColor: isMaximized ? "rgba(0, 0, 0, 0.5)" : "transparent",
            backdropFilter: isMaximized ? "blur(5px)" : "none"
          }}
        >
          <div
            className="shadow-lg rounded-lg overflow-hidden relative w-full h-auto  max-w-[80%] max-h-[60%]"
            style={
              !isMaximized
                ? {
                    position: "fixed",
                    bottom: position.bottom,
                    right: position.right,
                    maxWidth: "50%"
                  }
                : {}
            }
          >
            <div className="flex justify-between items-center bg-blue-500 p-2 text-white rounded-t-lg">
              <span>Chatbot Assistant</span>
              <div className="flex items-center space-x-2">
                {/* Maximize/Minimize Button */}
                <button
                  onClick={toggleMaximize}
                  className="bg-teal-500 text-white rounded-full flex items-center justify-center w-8 h-8"
                >
                  {isMaximized ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </button>

                {/* Close Button */}
                <button
                  onClick={toggleChatbot}
                  className="bg-red-500 text-white rounded-full flex items-center justify-center w-8 h-8"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <Chatbot
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
    </ContextProvider>
  );
};

export default ChatbotBubble;
