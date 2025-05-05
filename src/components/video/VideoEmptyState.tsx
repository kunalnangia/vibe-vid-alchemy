
import React from 'react';

interface VideoEmptyStateProps {
  message?: string;
}

const VideoEmptyState: React.FC<VideoEmptyStateProps> = ({ 
  message = "Add Your First Clip" 
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800/20 backdrop-blur-sm">
      <div className="text-center p-6">
        <div className="text-purple-600 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
            <polygon points="23 7 16 12 23 17 23 7"/>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-purple-900">{message}</h3>
        <p className="text-sm text-purple-700 mt-1">
          Upload a video or record with your camera
        </p>
      </div>
    </div>
  );
};

export default VideoEmptyState;
