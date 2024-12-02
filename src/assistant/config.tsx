import { Config, ChatData } from "@/assistant/types";

export const config: Config = {
  apiHost: "https://llm.criticalfutureglobal.com",
  chatflowId: "95e01dd4-ff2f-4055-a6f1-3cfc35261831",

  assistant: {
    name: "Ai Assistant",
    description: "Critical Future Chatbot Assistant",
    welcomeMessage: "Hello! How can I assist you today?",
    sidebar: true,
    avatar: {
      staticUrl:
        "https://github.com/Critical-Future-LLM-in-a-Box/llminaboxchatbots/blob/main/Avatars/fs/fs.png?raw=true",
      liveUrl:
        "https://github.com/Critical-Future-LLM-in-a-Box/llminaboxchatbots/blob/main/Avatars/fs/fs1.gif?raw=true",
      videoUrl:
        "https://github.com/Critical-Future-LLM-in-a-Box/llminaboxchatbots/raw/main/Avatars/fs/Joe%20intro.mp4"
    }
  },

  ui: {
    foregroundColor: "#000000",
    backgroundColor: "#F8F8FF",
    width: "100%",
    height: "100%"
  }
};

export const defaultConfig: Config = {
  apiHost: "",
  chatflowId: "",
  assistant: {
    name: "Assistant",
    description: "Your AI Assistant",
    welcomeMessage: "Hello! How can I help you?",
    voiceName: "",
    sidebar: false,
    avatar: {
      staticUrl: "",
      liveUrl: "",
      videoUrl: ""
    }
  },
  ui: {
    foregroundColor: "#000000",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%"
  }
};

export const defaultChatData: ChatData = {
  config: defaultConfig,
  error: "",
  session: {
    memory: false,
    chatId: "",
    chatMessages: [],
    allChats: []
  },
  api: {
    online: false,
    isApiTyping: false,
    isApiAcceptingVoice: false,
    isApiAcceptingImage: false,
    isApiAcceptingFile: false
  }
};
