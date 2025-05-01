
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Record } from "lucide-react";
import { toast } from "sonner";

interface UploadSectionProps {
  handleUpload: (file: File) => void;
  handleRecord: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  handleUpload,
  handleRecord
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is a video type
      if (!file.type.startsWith('video/')) {
        toast.error('Please select a video file');
        return;
      }
      
      // Call the handler with the selected file
      handleUpload(file);
      
      // Reset input value so same file can be selected again
      e.target.value = '';
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const startRecording = () => {
    // For now we'll just call the handler
    // In a real implementation, we would handle browser's recording API
    handleRecord();
    setIsRecording(true);
    setTimeout(() => setIsRecording(false), 500); // Visual feedback
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileSelected}
        accept="video/*"
        className="hidden"
      />
      
      <Button 
        className="px-8 py-6 text-lg bg-gray-100 hover:bg-gray-200 text-gray-800" 
        variant="outline"
        onClick={triggerFileInput}
      >
        <Upload className="mr-2 h-5 w-5" />
        Upload Video
      </Button>
      
      <Button 
        className={`px-8 py-6 text-lg ${isRecording ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'} hover:bg-gray-200`}
        variant="outline"
        onClick={startRecording}
      >
        <Record className={`mr-2 h-5 w-5 ${isRecording ? 'text-red-500' : ''}`} />
        Record Video
      </Button>
    </div>
  );
};

export default UploadSection;
