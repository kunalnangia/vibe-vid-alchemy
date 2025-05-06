
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Video } from 'lucide-react';
import { toast } from 'sonner';
import useVideoUpload from '@/hooks/useVideoUpload';

interface VideoUploaderProps {
  onFileSelected: (file: File) => void;
  maxSizeMB?: number;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ 
  onFileSelected, 
  maxSizeMB = 100 
}) => {
  const {
    fileInputRef,
    isDragging,
    uploadProgress,
    isUploading,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    openFileDialog
  } = useVideoUpload({
    onFileSelected,
    maxSizeMB
  });

  return (
    <div 
      className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors cursor-pointer 
        ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
      onClick={openFileDialog}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange} 
        accept="video/*" 
      />
      
      {isUploading ? (
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{Math.round(uploadProgress)}% Processing...</p>
        </div>
      ) : (
        <>
          <Video className="h-12 w-12 text-purple-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Upload a video</h3>
          <p className="text-sm text-gray-500 mb-4 text-center">
            Drag and drop a video file here, or click to browse
          </p>
          <Button className="btn-purple">
            <Upload className="h-4 w-4 mr-2" />
            Select Video
          </Button>
          <p className="text-xs text-gray-400 mt-2">MP4, MOV, or WebM format. Max {maxSizeMB}MB.</p>
        </>
      )}
    </div>
  );
};

export default VideoUploader;
