
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileVideo, Upload } from "lucide-react";

interface UploadDropZoneProps {
  openFileDialog: () => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
  maxSizeMB?: number;
}

const UploadDropZone: React.FC<UploadDropZoneProps> = ({
  openFileDialog,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  isDragging,
  maxSizeMB = 500
}) => {
  return (
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
  );
};

export default UploadDropZone;
