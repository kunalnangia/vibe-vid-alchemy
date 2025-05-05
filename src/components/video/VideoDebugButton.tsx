
import React from 'react';

interface VideoDebugButtonProps {
  showTroubleshooter: boolean;
  setShowTroubleshooter: (show: boolean) => void;
}

const VideoDebugButton: React.FC<VideoDebugButtonProps> = ({
  showTroubleshooter,
  setShowTroubleshooter
}) => {
  return (
    <button
      className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-30 hover:opacity-100"
      onClick={() => setShowTroubleshooter(!showTroubleshooter)}
    >
      {showTroubleshooter ? "Hide Debug" : "Debug"}
    </button>
  );
};

export default VideoDebugButton;
