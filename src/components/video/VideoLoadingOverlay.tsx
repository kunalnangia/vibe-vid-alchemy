
import React from 'react';
import { Loader2 } from 'lucide-react';

const VideoLoadingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 z-10">
      <div className="text-center text-white">
        <Loader2 className="h-10 w-10 animate-spin mx-auto" />
        <p className="mt-2 font-medium">Loading video...</p>
      </div>
    </div>
  );
};

export default VideoLoadingOverlay;
