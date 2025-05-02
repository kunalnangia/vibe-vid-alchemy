
export interface UseEditorPlaybackOptions {
  initialPlaying?: boolean;
  initialTime?: number;
  initialDuration?: number;
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
}
