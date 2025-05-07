
import React from 'react';
import { Play } from 'lucide-react';

interface VideoPlayOverlayProps {
  onClick: () => void;
}

const VideoPlayOverlay: React.FC<VideoPlayOverlayProps> = ({ onClick }) => {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer transition-opacity hover:bg-opacity-40"
      onClick={onClick}
    >
      <div className="rounded-full bg-white bg-opacity-90 p-5 shadow-lg transform transition-transform hover:scale-110">
        <Play className="h-8 w-8 text-blue-600 fill-current" style={{ marginLeft: '4px' }} />
      </div>
    </div>
  );
};

export default VideoPlayOverlay;
