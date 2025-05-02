
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, PaletteIcon } from "lucide-react";

interface CreativeControlsProps {
  settings: {
    tone: string;
    duration: string;
    mood: string;
  };
  onToneChange: (tone: string) => void;
  onDurationChange: (duration: string) => void;
  onMoodChange: (mood: string) => void;
}

const CreativeControls: React.FC<CreativeControlsProps> = ({
  settings,
  onToneChange,
  onDurationChange,
  onMoodChange
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-md font-medium text-blue-700 mb-2">Creative Controls:</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-blue-700">
            <MessageSquare className="mr-1 h-4 w-4 text-blue-500" />
            Tone
          </label>
          <div className="flex flex-wrap gap-2">
            {["professional", "casual", "energetic", "serious"].map(tone => (
              <Button
                key={tone}
                size="sm"
                variant={settings.tone === tone ? "default" : "outline"}
                className={settings.tone === tone 
                  ? "bg-blue-500 hover:bg-blue-600 text-white" 
                  : "border-blue-200 text-blue-700"}
                onClick={() => onToneChange(tone)}
              >
                {tone.charAt(0).toUpperCase() + tone.slice(1)}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-blue-700">
            <Clock className="mr-1 h-4 w-4 text-blue-500" />
            Duration
          </label>
          <div className="flex flex-wrap gap-2">
            {["30 seconds", "60 seconds", "2 minutes", "5 minutes"].map(duration => (
              <Button
                key={duration}
                size="sm"
                variant={settings.duration === duration ? "default" : "outline"}
                className={settings.duration === duration 
                  ? "bg-blue-500 hover:bg-blue-600 text-white" 
                  : "border-blue-200 text-blue-700"}
                onClick={() => onDurationChange(duration)}
              >
                {duration}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-blue-700">
            <PaletteIcon className="mr-1 h-4 w-4 text-blue-500" />
            Visual Mood
          </label>
          <div className="flex flex-wrap gap-2">
            {["bright", "dark", "vibrant", "minimalist"].map(mood => (
              <Button
                key={mood}
                size="sm"
                variant={settings.mood === mood ? "default" : "outline"}
                className={settings.mood === mood 
                  ? "bg-blue-500 hover:bg-blue-600 text-white" 
                  : "border-blue-200 text-blue-700"}
                onClick={() => onMoodChange(mood)}
              >
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeControls;
