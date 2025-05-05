
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, Video, FileVideo, Check } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import SimpleVideoPreview from './SimpleVideoPreview';

interface ReliableVideoUploaderProps {
  onFileSelected: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

const ReliableVideoUploader: React.FC<ReliableVideoUploaderProps> = ({
  onFileSelected,
  accept = "video/*",
  maxSizeMB = 500
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // Trigger file input
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

  // Process selected file
  const processFile = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }
    
    // Validate file size
    if (file.size > maxSizeBytes) {
      toast.error(`File too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadedFile(null);

    // Create a video element to check if the file can be played
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      // Continue with upload simulation
      console.log(`Video metadata loaded: ${file.name}, duration: ${video.duration}s`);
      simulateUpload(file);
    };
    
    video.onerror = () => {
      console.error(`Error loading video metadata for ${file.name}`);
      toast.error('The video format might not be supported by your browser');
      setIsUploading(false);
      
      // Still allow upload but warn user
      setTimeout(() => {
        simulateUpload(file);
      }, 1000);
    };
    
    // Set src to blob URL
    video.src = URL.createObjectURL(file);
  };
  
  // Simulate upload process
  const simulateUpload = (file: File) => {
    const totalSteps = 10;
    let step = 0;
    
    const interval = setInterval(() => {
      step++;
      const progress = Math.min(step * (100 / totalSteps), 100);
      setUploadProgress(progress);
      
      if (step >= totalSteps) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadedFile(file);
        onFileSelected(file);
        toast.success(`Video "${file.name}" processed successfully`);
      }
    }, 300);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
      
      {/* Video preview after upload */}
      {uploadedFile && (
        <div className="mb-4">
          <SimpleVideoPreview 
            file={uploadedFile} 
            onError={() => toast.error("Error playing the uploaded video")}
          />
          <div className="mt-2 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
              <Check size={16} />
              <span className="text-sm font-medium">Upload complete</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Upload progress */}
      {isUploading && (
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Processing video...</span>
            <span className="text-sm">{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}
      
      {/* Upload area */}
      {!uploadedFile && !isUploading && (
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
                Supports: MP4, WebM, MOV (max {maxSizeMB}MB)
              </p>
            </div>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Select Video File
            </Button>
          </div>
        </div>
      )}
      
      {/* Try again button */}
      {uploadedFile && (
        <Button 
          variant="outline" 
          className="mt-2 w-full"
          onClick={() => {
            setUploadedFile(null);
            openFileDialog();
          }}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload a Different Video
        </Button>
      )}
    </div>
  );
};

export default ReliableVideoUploader;
