
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import VideoPlaybackApp from "@/components/VideoPlaybackApp";
import VideoLifecycleManagement from "@/components/VideoLifecycleManagement";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        <div className="flex-1 p-6 space-y-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-purple-900">Video Editor</h1>
            <p className="text-purple-700">Upload and manage your videos</p>
          </header>
          
          {/* Video Player Demo Section */}
          <VideoPlaybackApp />
          
          {/* Video Lifecycle Management Section */}
          <VideoLifecycleManagement />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
