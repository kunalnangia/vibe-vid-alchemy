
import React from 'react';

interface VideoEmptyStateProps {
  message?: string;
}

const VideoEmptyState: React.FC<VideoEmptyStateProps> = ({ 
  message = "Upload a video to get started" 
}) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
      <div className="text-blue-400 mb-2">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
      </div>
      <div className="text-blue-700 font-medium">{message}</div>
      <div className="text-blue-500 text-sm mt-1">Or choose a template from the library</div>
    </div>
  );
};

export default VideoEmptyState;
