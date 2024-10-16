import React from "react";
import ReactDOM from "react-dom/client";
import Chatbot from "@/assistant/components/Chatbot";
import { ContextProvider, Config } from "@/assistant/context";
import "@/assistant/index.css";

export const initConfig: Config = {
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

export function init(config: Config = initConfig): void {
  let llminaboxRoot = document.querySelector("llminabox");

  if (!llminaboxRoot) {
    llminaboxRoot = document.createElement("llminabox");
    document.body.appendChild(llminaboxRoot);
  }

  ReactDOM.createRoot(llminaboxRoot).render(
    <ContextProvider initConfig={config}>
      <Chatbot />
    </ContextProvider>
  );
}

init();
