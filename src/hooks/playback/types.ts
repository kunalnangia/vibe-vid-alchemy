
export interface UseEditorPlaybackOptions {
  initialPlaying?: boolean;
  initialTime?: number;
  initialDuration?: number;
  maxDuration?: number;
  onTimeUpdate?: (time: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onError?: (error: Error) => void;
}

export interface UseEditorPlaybackReturn {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTime: number;
  setCurrentTime: (time: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  handlePlay: () => void;
  handlePause: () => void;
  handleSeek: (time: number) => void;
  handleEnd: () => void;
  handleTogglePlay: () => void;
  handleSliderChange: (value: number[]) => void;
  seekTo: (timeInSeconds: number) => void;
  error: Error | null;
  isLoading: boolean;
  progress: number;
}
