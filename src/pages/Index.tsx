
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import AppSidebar from "@/components/AppSidebar";
import VideoUploader from "@/components/video/VideoUploader";
import VideoPreview from "@/components/video/VideoPreview";
import { useVideoUpload } from '@/hooks/useVideoUpload';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  const { uploadVideo } = useVideoUpload();
  
  const handleFileSelected = async (file: File) => {
    const url = await uploadVideo(file);
    if (url) {
      setVideoUrl(url);
      toast.success('Video uploaded successfully');
    }
  };
  
  const handleExport = () => {
    if (!videoUrl) {
      toast.error('No video to export');
      return;
    }
    
    toast.success('Exporting video');
    // In a real app, we would process the video export here
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">VideoVibe Dashboard</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="studio-card p-6">
                <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
                <VideoUploader onFileSelected={handleFileSelected} />
                
                {videoUrl && (
                  <div className="mt-6 flex space-x-3">
                    <Button onClick={handleExport} className="btn-purple">
                      <Download className="h-4 w-4 mr-2" />
                      Export Video
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="studio-card p-6">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                <VideoPreview videoSrc={videoUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default Index;
