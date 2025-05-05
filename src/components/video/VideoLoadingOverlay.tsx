
import React from 'react';

const VideoLoadingOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="text-white text-center">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-3 mx-auto"></div>
        <p className="text-sm">Loading video...</p>
      </div>
    </div>
  );
};

export default VideoLoadingOverlay;
