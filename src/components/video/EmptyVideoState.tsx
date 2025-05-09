
import React from 'react';

const EmptyVideoState: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black rounded-lg">
      <div className="text-gray-400 mb-2">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
          <line x1="7" y1="2" x2="7" y2="22"/>
          <line x1="17" y1="2" x2="17" y2="22"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <line x1="2" y1="7" x2="7" y2="7"/>
          <line x1="2" y1="17" x2="7" y2="17"/>
          <line x1="17" y1="17" x2="22" y2="17"/>
          <line x1="17" y1="7" x2="22" y2="7"/>
        </svg>
      </div>
      <div className="text-gray-500 font-medium">No video selected</div>
      <div className="text-gray-600 text-sm mt-1">Upload a video file to get started</div>
    </div>
  );
};

export default EmptyVideoState;
