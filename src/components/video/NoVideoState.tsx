
import React from 'react';
import { Film, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoVideoStateProps {
  onUpload?: () => void;
}

const NoVideoState: React.FC<NoVideoStateProps> = ({ onUpload }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-10">
      <Film className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">No video selected</h3>
      <p className="text-gray-500 text-sm mb-4">Upload a video file to get started</p>
      
      {onUpload && (
        <Button 
          variant="outline" 
          onClick={onUpload}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Upload Video
        </Button>
      )}
    </div>
  );
};

export default NoVideoState;
