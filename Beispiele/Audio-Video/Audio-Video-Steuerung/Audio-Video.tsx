import { Button } from "@fluentui/react-components";
import { useRef } from "react";
import {
  Play24Regular,
  Pause24Regular,
  Stop24Regular,
  Previous24Regular,
  Next24Regular
} from "@fluentui/react-icons";

export function MediaControls() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) return;
    await video.play();
  };

  const pauseVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  const skipBackward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
  };

  const skipForward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(video.duration || Number.MAX_SAFE_INTEGER, video.currentTime + 10);
  };

  return (
    <div style={{ display: "grid", gap: "12px", maxWidth: "720px" }}>
      <video
        ref={videoRef}
        controls
        style={{ width: "100%", borderRadius: "8px" }}
        src="https://archive.org/download/the-benny-hill-show/03%20-%20Benny%20Hill.mp4"
      />
      <div style={{ display: "flex", gap: "8px" }}>
        <Button icon={<Previous24Regular />} aria-label="10 Sekunden zurück" onClick={skipBackward} />
        <Button icon={<Play24Regular />} onClick={playVideo}>
          Abspielen
        </Button>
        <Button icon={<Pause24Regular />} onClick={pauseVideo}>
          Pause
        </Button>
        <Button icon={<Stop24Regular />} onClick={stopVideo}>
          Stopp
        </Button>
        <Button icon={<Next24Regular />} aria-label="10 Sekunden vor" onClick={skipForward} />
      </div>
    </div>
  );
}