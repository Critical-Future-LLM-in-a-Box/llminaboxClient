import React, { useState, useRef, forwardRef } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useContextData } from "@/assistant/context";

// ChatAvatar Component
export function ChatAvatar(): JSX.Element {
  const [chatData] = useContextData();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleVideo = () => {
    if (isVideoOn) {
      videoRef.current?.pause();
    } else if (videoRef.current && videoRef.current.readyState >= 2) {
      videoRef.current.play();
    }
    setIsVideoOn(!isVideoOn);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <AvatarDisplay
        isVideoOn={isVideoOn}
        videoRef={videoRef}
        liveUrl={chatData.config.assistant.avatar?.liveUrl}
        videoUrl={chatData.config.assistant.avatar?.videoUrl}
        onVideoEnd={() => setIsVideoOn(false)}
      />
      <Button
        variant="outlined"
        sx={{ width: "100%", color: "text.secondary", mt: 1 }}
        onClick={toggleVideo}
      >
        {isVideoOn ? "Pause" : "About"}
      </Button>
    </Box>
  );
}

// AvatarDisplay Component - Handles video and image display for avatars
interface AvatarDisplayProps {
  isVideoOn: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  liveUrl?: string;
  videoUrl?: string;
  onVideoEnd: () => void;
}

const AvatarDisplay = ({
  isVideoOn,
  videoRef,
  liveUrl,
  videoUrl,
  onVideoEnd
}: AvatarDisplayProps) => (
  <Box
    sx={{
      width: 200,
      height: 200,
      borderRadius: 2,
      overflow: "hidden",
      position: "relative"
    }}
  >
    <Box
      component="img"
      src={liveUrl}
      alt="Avatar"
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: isVideoOn ? "none" : "block"
      }}
    />
    <Box
      component="video"
      ref={videoRef}
      src={videoUrl}
      onEnded={onVideoEnd}
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: isVideoOn ? "block" : "none"
      }}
    >
      <track
        kind="captions"
        srcLang="en"
        src="/path/to/captions.vtt"
        label="English"
      />
    </Box>
  </Box>
);

// InteractiveAvatar Component
interface InteractiveAvatarProps {
  isAvatarLoading: boolean;
}

const InteractiveAvatarComponent = (
  { isAvatarLoading }: InteractiveAvatarProps,
  ref: React.Ref<HTMLVideoElement>
): JSX.Element => (
  <Box
    sx={{
      position: "relative",
      width: 200,
      height: 200,
      borderRadius: 2,
      overflow: "hidden"
    }}
  >
    {isAvatarLoading && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          backgroundColor: "rgba(255, 255, 255, 0.7)"
        }}
      >
        <CircularProgress />
      </Box>
    )}
    <Box
      component="video"
      ref={ref}
      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
    >
      <track
        kind="captions"
        srcLang="en"
        src="/path/to/captions.vtt"
        label="English"
      />
    </Box>
  </Box>
);

export const InteractiveAvatar = forwardRef<
  HTMLVideoElement,
  InteractiveAvatarProps
>(InteractiveAvatarComponent);
