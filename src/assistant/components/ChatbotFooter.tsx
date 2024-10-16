import React from "react";
import color from "color";
import { useContextData } from "@/assistant/context";

export default function ChatbotFooter(): JSX.Element {
  const [chatData] = useContextData();
  return (
    <footer
      className="flex flex-row items-center justify-center border shadow-sm p-4 h-[80px]"
      style={{
        backgroundColor: color(chatData.config.themeColor)
          .darken(0.03)
          .string(),
        color: color(chatData.config.textColor).darken(0.05).string()
      }}
    >
      <p className="text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CriticalFuture. Made by{" "}
        <a
          href="https://criticalfutureglobal.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          CriticalFuture
        </a>
      </p>
    </footer>
  );
}
