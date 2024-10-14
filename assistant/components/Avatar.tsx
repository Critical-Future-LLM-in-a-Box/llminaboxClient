import React, { useState, useRef, forwardRef } from "react";
import { Button, CircularProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useContextData } from "@/assistant/context";

export function HeaderAvatar(): JSX.Element {
  const [chatData] = useContextData();
  const online = chatData.online;

  return (
    <div
      className="flex items-center gap-2"
      title={chatData.config.description}
    >
      <Avatar
        src={chatData.config.avatarStaticUrl}
        alt="Avatar"
        sx={{ width: 50, height: 50 }}
      />
      <div className="flex flex-col">
        <p className="text-lg">{chatData.config.name}</p>
        <div className="flex items-center text-sm">
          <div
            className={`w-2.5 h-2.5 rounded-full mr-2 ${
              online ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <div>{online ? "Online" : "Offline"}</div>
        </div>
      </div>
    </div>
  );
}

export function ChatAvatar(): JSX.Element {
  const [chatData] = useContextData();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const videoSrc = chatData.config.avatarVideoUrl;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <>
      <div className="rounded-lg overflow-hidden w-[200px] h-[200px]">
        <img
          src={chatData.config.avatarLiveUrl}
          alt="Avatar"
          className={"w-full h-full object-cover"}
          style={{ display: isVideoOn ? "none" : "block" }}
        />
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          onEnded={() => {
            setIsVideoOn(false);
          }}
          style={{ display: isVideoOn ? "block" : "none" }}
        >
          <track
            kind="captions"
            srcLang="en"
            src="/path/to/captions.vtt"
            label="English"
          />
        </video>
      </div>
      <Button
        variant="outlined"
        onClick={() => {
          if (isVideoOn) {
            videoRef.current?.pause();
            setIsVideoOn(false);
          } else {
            if (videoRef.current && videoRef.current.readyState > 2) {
              videoRef.current?.play();
              setIsVideoOn(true);
            }
          }
        }}
      >
        {isVideoOn ? "Pause" : "About"}
      </Button>
    </>
  );
}

export function InteractiveAvatarComponent(
  {
    isAvatarLoading
  }: {
    isAvatarLoading: boolean;
  },
  ref: React.Ref<HTMLVideoElement>
): JSX.Element {
  return (
    <div>
      {isAvatarLoading && (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      )}

      <div className="rounded-lg overflow-hidden w-[200px] h-[200px]">
        <video
          ref={ref}
          className="w-full h-full object-cover"
        >
          <track
            kind="captions"
            srcLang="en"
            src="/path/to/captions.vtt"
            label="English"
          />
        </video>
      </div>
    </div>
  );
}

export const InteractiveAvatar = forwardRef<
  HTMLVideoElement,
  {
    isAvatarLoading: boolean;
  }
>(InteractiveAvatarComponent);
