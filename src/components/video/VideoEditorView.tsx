
import React from 'react';
import { Play, Pause } from 'lucide-react';

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
              <Pause className="text-white" />
            ) : (
              <Play className="text-white" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoEditorView;
