
import React from 'react';

interface VideoPlayPauseOverlayProps {
  isPlaying: boolean;
  currentTime: number;
  projectDuration: number;
  togglePlay: () => void;
}

const VideoPlayPauseOverlay: React.FC<VideoPlayPauseOverlayProps> = ({
  isPlaying,
  currentTime,
  projectDuration,
  togglePlay
}) => {
  // Format time in MM:SS format
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-controls absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 hover:opacity-100 transition-opacity">
      <div className="flex items-center justify-between">
        <button 
          className="text-white bg-purple-600 rounded-full p-2 hover:bg-purple-700 transition"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          )}
        </button>
        
        <div className="text-white text-sm">
          {formatTime(currentTime)} / {formatTime(projectDuration)}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayPauseOverlay;
