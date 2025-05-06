
import { useState, useRef } from 'react';
import { toast } from "sonner";

interface UseVideoUploadProps {
  onFileSelected?: (file: File) => void;
  maxSizeMB?: number;
}

export const useVideoUpload = ({
  onFileSelected,
  maxSizeMB = 500
}: UseVideoUploadProps = {}) => {
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
        if (onFileSelected) {
          onFileSelected(file);
        }
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
  
  // Add uploadVideo function that was missing
  const uploadVideo = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      processFile(file);
      
      // Create a timeout to simulate the upload completion
      const checkUpload = setInterval(() => {
        if (!isUploading && uploadedFile) {
          clearInterval(checkUpload);
          // Return a blob URL for the video
          const blobUrl = URL.createObjectURL(uploadedFile);
          resolve(blobUrl);
        }
      }, 500);
      
      // Timeout after 15 seconds to prevent hanging
      setTimeout(() => {
        clearInterval(checkUpload);
        if (isUploading) {
          toast.error('Upload timed out');
          setIsUploading(false);
          resolve(null);
        }
      }, 15000);
    });
  };
  
  return {
    fileInputRef,
    isDragging,
    uploadProgress,
    isUploading,
    uploadedFile,
    setUploadedFile,
    openFileDialog,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    uploadVideo
  };
};

// Also export as default for backward compatibility
export default useVideoUpload;
