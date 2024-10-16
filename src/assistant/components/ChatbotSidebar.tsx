import React, { useState, useEffect } from "react";
import color from "color";
import { Tabs, Tab } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { ChatAvatar } from "@/assistant/components/Avatar";
import { useContextData } from "@/assistant/context";

export default function ChatbotSidebar(): JSX.Element {
  const [chatData] = useContextData();
  const [isAboutOpen, setIsAboutOpen] = useState(window.innerWidth > 768);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      className="relative"
      style={{
        backgroundColor: color(chatData.config.themeColor)
          .darken(0.01)
          .string(),
        color: color(chatData.config.textColor).darken(0.05).string()
      }}
    >
      <div
        className={`flex flex-col justify-between items-center gap-8 min-h-full border-r overflow-hidden ${
          isAboutOpen ? "p-4" : "w-0 p-0"
        }`}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => {
            setActiveTab(newValue);
          }}
        >
          <Tab
            label="Avatar"
            sx={{ fontSize: "12px", padding: "6px" }}
          />
          <Tab
            label="Conversations"
            sx={{ fontSize: "12px", padding: "6px" }}
          />
        </Tabs>

        {activeTab === 0 ? <ChatAvatar /> : <ChatSidebar />}
      </div>
      <button
        className="w-8 h-8 rounded-full absolute top-1/2 -right-4"
        style={{
          backgroundColor: color(chatData.config.themeColor)
            .darken(0.03)
            .string(),
          color: color(chatData.config.textColor).darken(0.05).string()
        }}
        onClick={() => setIsAboutOpen(!isAboutOpen)}
      >
        {isAboutOpen ? <ArrowLeft /> : <ArrowRight />}
      </button>
    </div>
  );
}

function ChatSidebar() {
  const [conversations, setConversations] = useState<
    { id: number; title: string }[]
  >([]);

  useEffect(() => {
    // Initialize with some dummy conversations or fetch from an API
    setConversations([
      { id: 1, title: "Conversation 1" },
      { id: 2, title: "Conversation 2" },
      { id: 3, title: "Conversation 3" }
      // Add more conversations as needed
    ]);
  }, []);

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold mb-4">Conversations</h3>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className="mb-2"
          >
            <button className="text-left w-full hover:underline">
              {conversation.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
