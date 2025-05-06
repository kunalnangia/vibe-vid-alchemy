
import { useState } from 'react';

const useVideoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadVideo = async (file: File) => {
    if (!file) return;
    
    try {
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);
      
      // Create a blob URL for the file
      const url = URL.createObjectURL(file);
      console.info(`Creating object URL for file: ${file.name} ${file.type}`);
      
      // Simulate upload progress for better UX
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      // Simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      clearInterval(interval);
      setUploadProgress(100);
      setVideoUrl(url);
      console.info(`Video file uploaded: ${file.name}, size: ${Math.round(file.size / 1024)}KB, type: ${file.type}`);
      
      return url;
    } catch (err) {
      console.error('Error uploading video:', err);
      setError('Failed to upload video');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadVideo,
    isUploading,
    uploadProgress,
    videoUrl,
    error,
    reset: () => {
      setVideoUrl(null);
      setError(null);
      setUploadProgress(0);
      setIsUploading(false);
    }
  };
};

export default useVideoUpload;
