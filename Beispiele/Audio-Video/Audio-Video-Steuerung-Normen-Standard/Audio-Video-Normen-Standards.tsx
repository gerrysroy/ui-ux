import { useEffect, useRef, useState } from "react";
import { Button, Slider, Text } from "@fluentui/react-components";
import { Play24Regular, Pause24Regular, Previous24Regular, Next24Regular, Speaker224Regular } from "@fluentui/react-icons";

export function StandardMediaPlayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(60);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume / 100;
  }, [volume]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  const seekBy = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.currentTime + seconds, duration || video.duration || 0));
  };

  const formatTime = (timeInSeconds: number) => {
    if (!Number.isFinite(timeInSeconds)) return "00:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div style={{ display: "grid", gap: "12px", width: "420px" }}>
      <video
        ref={videoRef}
        src="https://archive.org/download/the-benny-hill-show/16%20-%20Benny%20Hill.mp4"
        controls
        style={{ width: "100%" }}
        onLoadedMetadata={(event) => {
          setDuration(event.currentTarget.duration || 0);
          setCurrentTime(event.currentTarget.currentTime || 0);
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime || 0);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div style={{ display: "flex", gap: "8px" }}>
        <Button icon={<Previous24Regular />} onClick={() => seekBy(-10)} aria-label="10 Sekunden zurück">
          -10s
        </Button>
        <Button
          icon={isPlaying ? <Pause24Regular /> : <Play24Regular />}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button icon={<Next24Regular />} onClick={() => seekBy(10)} aria-label="10 Sekunden vor">
          +10s
        </Button>
      </div>

      <Text>Wiedergabeposition: {formatTime(currentTime)} / {formatTime(duration)}</Text>
      <Slider
        aria-label="Wiedergabeposition"
        min={0}
        max={duration || 0}
        step={0.1}
        value={Math.min(currentTime, duration || 0)}
        onChange={(_, data) => {
          const video = videoRef.current;
          if (!video) return;
          const sliderValue = Array.isArray(data.value) ? data.value[0] : data.value;
          const nextTime = Number(sliderValue);
          video.currentTime = nextTime;
          setCurrentTime(nextTime);
        }}
      />

      <Text>
        <Speaker224Regular /> Lautstärke: {volume}%
      </Text>
      <Slider
        aria-label="Lautstärke"
        min={0}
        max={100}
        value={volume}
        onChange={(_, data) => {
          const sliderValue = Array.isArray(data.value) ? data.value[0] : data.value;
          setVolume(Number(sliderValue));
        }}
      />
    </div>
  );
}