
export interface VideoClip {
  id: string;
  src: string;
  file?: File;  // Making sure file property is properly defined
  start: number;
  end: number;
  position: number;
  duration: number;
  name?: string;
  type?: string;
}

export interface TextOverlay {
  id: string;
  text: string;
  position: { x: number, y: number };
  style: {
    color: string;
    fontSize: string;
    fontFamily: string;
  };
  startTime: number;
  endTime: number;
}

export interface VideoPreviewProps {
  clips: VideoClip[];
  textOverlays: TextOverlay[];
  currentTime: number;
  setCurrentTime: (time: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  projectDuration: number;
  currentFilter: string;
  aspectRatio: string;
  greenScreenEnabled?: boolean;
}
