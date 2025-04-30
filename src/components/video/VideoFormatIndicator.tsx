
import React from 'react';

interface VideoFormatIndicatorProps {
  aspectRatio: string;
  currentFilter: string;
}

const VideoFormatIndicator: React.FC<VideoFormatIndicatorProps> = ({ 
  aspectRatio, 
  currentFilter 
}) => {
  const getAspectRatioLabel = () => {
    switch (aspectRatio) {
      case 'landscape': return '16:9 Landscape';
      case 'portrait': return '9:16 Portrait';
      case 'square': return '1:1 Square';
      case 'vertical': return '4:5 Vertical';
      case 'cinema': return '21:9 Cinema';
      default: return 'Custom';
    }
  };

  return (
    <div className="mt-2 text-xs text-blue-500 font-medium">
      {getAspectRatioLabel()}
      {currentFilter !== 'normal' && ` • Filter: ${currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)}`}
    </div>
  );
};

export default VideoFormatIndicator;
