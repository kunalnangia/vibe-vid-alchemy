
import React, { useState, useEffect } from 'react';

interface Caption {
  id: number;
  text: string;
  startTime: number;
  endTime: number;
}

interface AutoCaptionsHandlerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  enabled: boolean;
  onToggle: () => void;
  currentTime: number;
}

const AutoCaptionsHandler: React.FC<AutoCaptionsHandlerProps> = ({
  videoRef,
  enabled,
  onToggle,
  currentTime
}) => {
  const [captions, setCaptions] = useState<Caption[]>([
    { id: 1, text: "Welcome to our video presentation", startTime: 0.5, endTime: 3.0 },
    { id: 2, text: "Today we're discussing video editing features", startTime: 3.5, endTime: 6.0 },
    { id: 3, text: "You can easily trim, crop and add effects", startTime: 6.5, endTime: 9.0 },
    { id: 4, text: "Our AI will enhance your content automatically", startTime: 9.5, endTime: 12.0 }
  ]);
  const [currentCaption, setCurrentCaption] = useState<Caption | null>(null);

  // Find the current caption based on video time
  useEffect(() => {
    if (enabled && captions.length > 0) {
      const active = captions.find(
        caption => currentTime >= caption.startTime && currentTime <= caption.endTime
      );
      
      setCurrentCaption(active || null);
    } else {
      setCurrentCaption(null);
    }
  }, [currentTime, enabled, captions]);

  if (!enabled || !currentCaption) {
    return null;
  }

  return (
    <div className="absolute left-0 bottom-10 w-full flex justify-center pointer-events-none">
      <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-md text-center max-w-xl">
        {currentCaption.text}
      </div>
    </div>
  );
};

export default AutoCaptionsHandler;
