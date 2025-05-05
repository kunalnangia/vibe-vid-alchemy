
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

interface UploadProgressProps {
  isUploading: boolean;
  uploadProgress: number;
}

export const UploadProgress: React.FC<UploadProgressProps> = ({
  isUploading,
  uploadProgress
}) => {
  if (!isUploading) return null;
  
  return (
    <div className="mb-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Processing video...</span>
        <span className="text-sm">{Math.round(uploadProgress)}%</span>
      </div>
      <Progress value={uploadProgress} className="h-2" />
    </div>
  );
};

export const UploadComplete: React.FC = () => {
  return (
    <div className="mt-2 flex items-center justify-center">
      <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
        <Check size={16} />
        <span className="text-sm font-medium">Upload complete</span>
      </div>
    </div>
  );
};

export default UploadProgress;
