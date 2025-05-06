
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Video } from 'lucide-react';
import { toast } from 'sonner';

interface SimpleVideoUploaderProps {
  onFileSelected: (file: File) => void;
}

const SimpleVideoUploader: React.FC<SimpleVideoUploaderProps> = ({ onFileSelected }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast.error('Invalid file type', {
        description: 'Please select a video file',
      });
      return;
    }
    
    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast.error('File too large', {
        description: 'Video must be smaller than 100MB',
      });
      return;
    }
    
    onFileSelected(file);
    toast.success('Video selected', {
      description: `${file.name} is ready for upload`,
    });
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={handleButtonClick}>
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange} 
        accept="video/*" 
      />
      
      <Video className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-700 mb-2">Upload a video</h3>
      <p className="text-sm text-gray-500 mb-4 text-center">
        Drag and drop a video file here, or click to browse
      </p>
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Upload className="h-4 w-4 mr-2" />
        Select Video
      </Button>
      <p className="text-xs text-gray-400 mt-2">MP4, MOV, or WebM format. Max 100MB.</p>
    </div>
  );
};

export default SimpleVideoUploader;
