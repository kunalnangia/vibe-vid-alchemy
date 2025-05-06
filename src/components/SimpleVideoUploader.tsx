
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Video, FileVideo } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface SimpleVideoUploaderProps {
  onFileSelected: (file: File) => void;
  accept?: string;
}

const SimpleVideoUploader: React.FC<SimpleVideoUploaderProps> = ({
  onFileSelected,
  accept = "video/*"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Trigger file input click
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection from input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    processFile(file);
    
    // Clear input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Process the selected file
  const processFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Only call the callback after "upload" is complete
          onFileSelected(file);
          toast.success(`Video "${file.name}" uploaded successfully`);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    processFile(file);
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      
      {isUploading ? (
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Uploading...</span>
            <span className="text-sm">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging 
              ? "border-purple-500 bg-purple-50" 
              : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
          }`}
          onClick={openFileDialog}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="p-4 bg-purple-100 rounded-full">
              <FileVideo className="h-8 w-8 text-purple-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Upload Video</h3>
              <p className="text-sm text-gray-500">
                Drag and drop a video file, or click to browse
              </p>
              <p className="text-xs text-gray-400">
                Supports: MP4, WebM, MOV (max 500MB)
              </p>
            </div>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Select Video File
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleVideoUploader;
