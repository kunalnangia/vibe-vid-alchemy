
import React from 'react';

interface VideoStatusIndicatorsProps {
  aspectRatio: string;
  greenScreenEnabled?: boolean;
}

const VideoStatusIndicators: React.FC<VideoStatusIndicatorsProps> = ({
  aspectRatio,
  greenScreenEnabled = false
}) => {
  return (
    <>
      {/* Green screen indicator */}
      {greenScreenEnabled && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
          Green Screen Active
        </div>
      )}
      
      {/* Format identifier */}
      <div className="absolute top-2 left-2 bg-black/40 text-white text-xs px-2 py-1 rounded">
        {aspectRatio.charAt(0).toUpperCase() + aspectRatio.slice(1)}
      </div>
    </>
  );
};

export default VideoStatusIndicators;
