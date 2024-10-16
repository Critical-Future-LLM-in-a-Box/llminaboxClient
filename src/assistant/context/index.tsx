import { default as React, createContext, useContext } from "react";
import { useImmerReducer } from "use-immer";

export interface Message {
  role: string;
  content: string;
  timestamp: string;
  uploads?: {
    data: string;
    type: string;
    name: string;
    mime: string;
  }[];
}

export interface Config {
  apiHost?: string;
  chatflowid?: string;
  sessionid?: string;
  name?: string;
  description?: string;
  voiceName?: string;
  welcomeMessage?: string;
  avatarStaticUrl?: string;
  avatarLiveUrl?: string;
  avatarVideoUrl?: string;
  themeColor?: string;
  textColor?: string;
  chatMemory?: boolean;
  width?: string;
  height?: string;
}

export interface ChatData {
  messages: Message[];
  config: Config;
  online: boolean;
  error: string;
  isApiTyping: boolean;
  isApiAcceptingVoice: boolean;
  isApiAcceptingImage: boolean;
  isApiAcceptingFiles: boolean;
}

export const createDefaultContextData = (
  initConfig: Config = {},
  welcomeMessage: Message = {
    role: "apiMessage",
    content: "Hi there! How can I assist you today?",
    timestamp: new Date().toLocaleString()
  }
): ChatData => {
  return {
    messages: [welcomeMessage],
    online: false,
    isApiTyping: false,
    isApiAcceptingVoice: false,
    isApiAcceptingImage: false,
    isApiAcceptingFiles: false,
    error: "",
    config: {
      apiHost: "",
      chatflowid: "",
      name: "",
      description: "",
      voiceName: "",
      avatarStaticUrl: "",
      avatarLiveUrl: "",
      avatarVideoUrl: "",
      chatMemory: false,
      themeColor: "",
      textColor: "",
      width: "",
      height: "",
      ...initConfig,
      sessionid: localStorage.getItem("sessionid")
        ? (localStorage.getItem("sessionid") as string)
        : initConfig.sessionid
    }
  };
};

export const Context = createContext<
  [
    ChatData,
    React.Dispatch<{
      type: string;
      payload: string | boolean | Message | Config;
    }>
  ]
>([createDefaultContextData(), () => {}]);

export const useContextData = () => {
  return useContext(Context);
};

export function ContextProvider({
  children,
  initConfig
}: {
  children: React.ReactNode;
  initConfig: Config;
}): JSX.Element {
  const [chatData, dispatch] = useImmerReducer(
    chatReducer,
    createDefaultContextData(initConfig)
  );

  return (
    <Context.Provider value={[chatData, dispatch]}>{children}</Context.Provider>
  );
}


export const chatReducer = (
  draft: ChatData,
  action: { type: string; payload: string | boolean | Message | Config }
) => {
  switch (action.type) {
    case "SET_CONFIG":
      draft.config = action.payload as Config;
      break;
    case "SET_ERROR":
      draft.error = action.payload as string;
      break;
    case "SET_SESSION_ID":
      draft.config.sessionid = action.payload as string;
      break;
    case "SET_CHAT_MEMORY":
      draft.config.chatMemory = !!action.payload as boolean;
      break;
    case "SET_ONLINE_STATUS":
      draft.online = !!action.payload as boolean;
      break;
    case "SET_API_TYPING":
      draft.isApiTyping = !!action.payload as boolean;
      break;
    case "SET_API_ACCEPTING_VOICE":
      draft.isApiAcceptingVoice = !!action.payload as boolean;
      break;
    case "SET_API_ACCEPTING_IMAGE":
      draft.isApiAcceptingImage = !!action.payload as boolean;
      break;
    case "SET_API_ACCEPTING_FILES":
      draft.isApiAcceptingFiles = !!action.payload as boolean;
      break;
    case "CLEAR_CHAT":
      draft.messages = [...createDefaultContextData().messages];
      const newSessionID = Math.random().toString(10).substring(2, 12);
      draft.config.sessionid = newSessionID;
      localStorage.setItem("sessionid", newSessionID);
      break;
    case "ADD_MESSAGE":
      draft.messages.push(action.payload as Message);
      break;
    case "DELETE_MESSAGE":
      draft.messages.pop();
      break;
    case "UPDATE_MESSAGE":
      const newMessage = action.payload as Message;
      const oldMessage = draft.messages.pop();
      if (oldMessage) {
        draft.messages.push({
          ...oldMessage,
          ...newMessage
        });
      }
    default:
      break;
  }
};
