
import React from 'react';

const VideoPreviewPlaceholder: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-gray-200 h-24 rounded-md"></div>
      <div className="bg-gray-200 h-24 rounded-md"></div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        <div className="bg-gray-200 rounded-md"></div>
        <div className="bg-gray-200 rounded-md"></div>
        <div className="bg-gray-200 rounded-md"></div>
        <div className="bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default VideoPreviewPlaceholder;
