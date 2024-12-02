export interface Config {
  apiHost: string;
  chatflowId: string;
  authToken?: string;

  assistant: {
    name: string;
    description: string;
    welcomeMessage: string;
    voiceName?: string;
    sidebar?: boolean;
    avatar: {
      staticUrl?: string;
      liveUrl?: string;
      videoUrl?: string;
    };
  };

  ui?: {
    foregroundColor?: string;
    backgroundColor?: string;
    width?: string;
    height?: string;
  };
}

export interface Message {
  id: string;
  role: string;
  content: string;
  timestamp: string;
  uploads: {
    name?: string;
    type?: string;
    mime?: string;
    data?: string;
  }[];
}

export interface ChatData {
  config: Config;
  error: string;
  session: {
    memory?: boolean;
    chatId?: string;
    chatMessages: Message[];
    allChats?: string[];
  };

  api: {
    online: boolean;
    isApiTyping: boolean;
    isApiAcceptingVoice: boolean;
    isApiAcceptingImage: boolean;
    isApiAcceptingFile: boolean;
  };
}

export type ChatAction =
  | { type: "SET_CONFIG"; payload: Config }
  | { type: "SET_ERROR"; payload: string };
