
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
  <div className="toolbar mb-4 flex items-center rounded-xl px-3 py-2 bg-white/70 dark:bg-editor-darker/75 shadow-lg border border-gray-200 dark:border-editor-purple/50 max-w-3xl mx-auto studio-card font-ui">
    <button className="toolbar-button" title="Go to Start" onClick={() => seekTo(0)}>
      <SkipBack size={22} />
    </button>
    <button className="toolbar-button" title={isPlaying ? "Pause" : "Play"} onClick={togglePlay}>
      {isPlaying ? <Pause size={22} /> : <Play size={22} />}
    </button>
    <button className="toolbar-button" title="Go to End" onClick={() => seekTo(duration)}>
      <SkipForward size={22} />
    </button>
    <div className="flex-1 mx-6">
      <Slider
        value={[currentTime]}
        min={0}
        max={duration || 100}
        step={0.01}
        onValueChange={(values) => seekTo(values[0])}
        className="h-2"
      />
    </div>
    <div className="text-xs text-gray-500 font-semibold tracking-wide min-w-[86px] text-right">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  </div>
);

export default VideoControls;

