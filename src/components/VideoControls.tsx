
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  currentTime: number;
  duration: number;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds === 0) return '00:00.0';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
};

const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  togglePlay,
  seekTo,
  currentTime,
  duration
}) => (
  <div className="toolbar mb-4 flex items-center">
    <button className="toolbar-button" onClick={() => seekTo(0)}>
      <SkipBack size={20} />
    </button>
    <button className="toolbar-button" onClick={togglePlay}>
      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
    </button>
    <button className="toolbar-button" onClick={() => seekTo(duration)}>
      <SkipForward size={20} />
    </button>
    <div className="flex-1 mx-4">
      <Slider
        value={[currentTime]}
        min={0}
        max={duration || 100}
        step={0.01}
        onValueChange={(values) => seekTo(values[0])}
      />
    </div>
    <div className="text-sm text-gray-300">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  </div>
);

export default VideoControls;

