
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import SimpleVideoPreview from './SimpleVideoPreview';
import UploadDropZone from './upload/UploadDropZone';
import { UploadProgress, UploadComplete } from './upload/UploadProgress';
import { useVideoUpload } from './upload/useVideoUpload';

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
  const {
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
    handleDrop
  } = useVideoUpload({ onFileSelected, maxSizeMB });

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
          <UploadComplete />
        </div>
      )}
      
      {/* Upload progress */}
      <UploadProgress 
        isUploading={isUploading}
        uploadProgress={uploadProgress}
      />
      
      {/* Upload area */}
      {!uploadedFile && !isUploading && (
        <UploadDropZone
          openFileDialog={openFileDialog}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          isDragging={isDragging}
          maxSizeMB={maxSizeMB}
        />
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
