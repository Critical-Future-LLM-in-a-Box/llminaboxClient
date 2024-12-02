import React from "react";
import ReactDOM from "react-dom/client";

import { ContextProvider } from "@/assistant/context";
import { Config } from "@/assistant/types";
import { config } from "@/assistant/config";

import ChatbotFull from "@/assistant/components/ChatbotFull";
import ChatbotBubble from "@/assistant/components/ChatbotBubble";

export default function init(config: Config): void {
  let chatbotFull = true;
  let chatbotRoot = document.querySelector("llminabox");

  if (!chatbotRoot) {
    chatbotFull = false;
    chatbotRoot = document.createElement("llminabox");
    document.body.appendChild(chatbotRoot);
  }

  ReactDOM.createRoot(chatbotRoot).render(
    <ContextProvider config={config}>
      {chatbotFull ? <ChatbotFull /> : <ChatbotBubble />}
    </ContextProvider>
  );
}

init(config);
