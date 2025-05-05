
import React from 'react';

const NoVideoState: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-gray-400 text-center">
        <p>No video selected</p>
      </div>
    </div>
  );
};

export default NoVideoState;
