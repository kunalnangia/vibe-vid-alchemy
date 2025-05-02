
import React from 'react';

interface VideoFormatIndicatorProps {
  aspectRatio: string;
  currentFilter: string;
}

const VideoFormatIndicator: React.FC<VideoFormatIndicatorProps> = ({
  aspectRatio,
  currentFilter
}) => {
  return (
    <div className="video-format-indicator mt-3 flex space-x-4 justify-center">
      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        {aspectRatio.charAt(0).toUpperCase() + aspectRatio.slice(1)}
      </span>
      {currentFilter !== 'normal' && (
        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">
          {currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)} Filter
        </span>
      )}
    </div>
  );
};

export default VideoFormatIndicator;
