
/**
 * Configuration options for the editor playback hook
 */
export interface UseEditorPlaybackOptions {
  initialTime?: number;
  maxDuration?: number;
  onTimeUpdate?: (time: number) => void;
  onPlayStateChange?: (isPlaying: boolean) => void;
  onError?: (error: Error) => void;
}

/**
 * Return type for the editor playback hook
 */
export interface UseEditorPlaybackReturn {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
  handlePlay: () => void;
  handlePause: () => void;
  handleTogglePlay: () => void;
  handleSliderChange: (value: number[]) => void;
  seekTo: (timeInSeconds: number) => void;
  error: Error | null;
  isLoading: boolean;
  progress: number; // 0-100 percentage of progress
}
