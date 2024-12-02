import React, { createContext, useContext, ReactNode } from "react";
import { useImmerReducer } from "use-immer";
import { Config, ChatData, ChatAction } from "@/assistant/types";
import { defaultConfig, defaultChatData } from "@/assistant/config";

export const ChatContext = createContext<
  [ChatData, React.Dispatch<ChatAction>] | null
>(null);

export const useContextData = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useContextData must be used within a ContextProvider");
  }
  return context;
};

const initializeChatData = (userConfig: Config): ChatData => ({
  ...defaultChatData,
  config: { ...defaultConfig, ...userConfig }
});

export const ContextProvider = ({
  children,
  config
}: {
  children: ReactNode;
  config: Config;
}): JSX.Element => {
  const chatDataContextValue = initializeChatData(config);

  const welcomeMessage = {
    id: "1",
    role: "api",
    content: chatDataContextValue.config.assistant.welcomeMessage,
    timestamp: new Date().toISOString(),
    uploads: []
  };

  chatDataContextValue.session?.chatMessages?.push(welcomeMessage);

  const [chatData, dispatch] = useImmerReducer(
    chatReducer,
    chatDataContextValue
  );

  return (
    <ChatContext.Provider value={[chatData, dispatch]}>
      {children}
    </ChatContext.Provider>
  );
};

export const chatReducer = (draft: ChatData, action: ChatAction) => {
  switch (action.type) {
    case "SET_CONFIG":
      draft.config = { ...defaultConfig, ...action.payload };
      break;
    default:
      draft = draft;
  }
};
