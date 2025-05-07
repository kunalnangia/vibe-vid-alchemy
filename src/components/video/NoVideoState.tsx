
import React, { useRef } from 'react';
import { Film, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface NoVideoStateProps {
  onUpload?: (file: File) => void;
}

const NoVideoState: React.FC<NoVideoStateProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file is a video
      if (!file.type.startsWith('video/')) {
        toast.error('Please upload a video file');
        return;
      }
      
      // Check file size (limit to 500MB)
      if (file.size > 500 * 1024 * 1024) {
        toast.error('File too large. Maximum size is 500MB');
        return;
      }
      
      if (onUpload) {
        onUpload(file);
      }
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-10">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />
      <Film className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">No video selected</h3>
      <p className="text-gray-500 text-sm mb-4">Upload a video file to get started</p>
      
      <Button 
        variant="outline" 
        onClick={triggerFileInput}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        Upload Video
      </Button>
    </div>
  );
};

export default NoVideoState;
