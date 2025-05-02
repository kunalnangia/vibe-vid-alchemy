
import React from 'react';

interface VideoEditorViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  handlePlayPause: () => void;
  hasVideo: boolean;
}

const VideoEditorView: React.FC<VideoEditorViewProps> = ({
  videoRef,
  isPlaying,
  handlePlayPause,
  hasVideo
}) => {
  return (
    <div className="video-display relative aspect-video">
      {hasVideo ? (
        <video
          ref={videoRef}
          className="w-full h-full bg-black"
          onClick={handlePlayPause}
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
          No video loaded
        </div>
      )}
      
      {/* Play/Pause Overlay */}
      {hasVideo && (
        <div 
          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
          onClick={handlePlayPause}
        >
          <div className="bg-black bg-opacity-50 rounded-full p-4">
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoEditorView;
