
import React from 'react';
import { Play } from 'lucide-react';

interface VideoPlayOverlayProps {
  onClick: () => void;
}

const VideoPlayOverlay: React.FC<VideoPlayOverlayProps> = ({ onClick }) => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-black bg-opacity-50 rounded-full p-5">
        <Play className="h-8 w-8 text-white ml-1" />
      </div>
    </div>
  );
};

export default VideoPlayOverlay;
