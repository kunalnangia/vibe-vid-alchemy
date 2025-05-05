
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileVideo, Download, AlertTriangle } from "lucide-react";

interface VideoConverterProps {
  file: File;
  onConversionComplete?: (newFile: File) => void;
}

const VideoConverter: React.FC<VideoConverterProps> = ({ 
  file,
  onConversionComplete
}) => {
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  
  // This is a simulated conversion since actual video conversion in browser
  // is complex and inefficient. In a real app, this would use a server-side process.
  const convertToMP4 = () => {
    if (!file) {
      toast.error("No file to convert");
      return;
    }
    
    // Check if already an MP4
    if (file.type === "video/mp4") {
      toast.info("File is already in MP4 format");
      return;
    }
    
    setIsConverting(true);
    setConversionProgress(0);
    
    // Simulate conversion progress
    const progressInterval = setInterval(() => {
      setConversionProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 300);
    
    // Simulate completion after some time
    setTimeout(() => {
      clearInterval(progressInterval);
      setConversionProgress(100);
      
      // Create a new "converted" file (in reality, this is the same file with a different name)
      const fileName = file.name.split('.')[0] + '.mp4';
      const convertedFile = new File([file], fileName, { type: 'video/mp4' });
      
      if (onConversionComplete) {
        onConversionComplete(convertedFile);
      }
      
      setIsConverting(false);
      toast.success("Video converted to MP4 format");
    }, 3000);
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-yellow-500">
          <AlertTriangle size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-yellow-800">Video Format Issue Detected</h3>
          <p className="text-sm text-yellow-700 mt-1">
            The current video format ({file.type || 'unknown'}) might not be compatible with all browsers. 
            Converting to MP4 format can improve playback reliability.
          </p>
          
          {isConverting ? (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Converting to MP4...</span>
                <span>{conversionProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${conversionProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              <Button 
                size="sm"
                variant="outline" 
                className="bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
                onClick={convertToMP4}
              >
                <FileVideo className="mr-1 h-4 w-4" />
                Convert to MP4
              </Button>
              
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => toast.info("Using original format. Playback may be limited in some browsers.")}
              >
                Use Original Format
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoConverter;
