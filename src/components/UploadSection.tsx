
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Record } from "@/components/ui/lucide-icons";
import { toast } from "sonner";

interface UploadSectionProps {
  handleUpload: () => void;
  handleRecord: () => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({
  handleUpload,
  handleRecord
}) => {
  return (
    <div className="flex space-x-4">
      <Button 
        className="px-8 py-6 text-lg bg-gray-100 hover:bg-gray-200 text-gray-800" 
        variant="outline"
        onClick={handleUpload}
      >
        <Upload className="mr-2 h-5 w-5" />
        Upload Video
      </Button>
      
      <Button 
        className="px-8 py-6 text-lg bg-gray-100 hover:bg-gray-200 text-gray-800" 
        variant="outline"
        onClick={handleRecord}
      >
        <Record className="mr-2 h-5 w-5" />
        Record Video
      </Button>
    </div>
  );
};

export default UploadSection;
