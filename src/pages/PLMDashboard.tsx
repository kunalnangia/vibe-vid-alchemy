
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import VideoLifecycleManagement from '@/components/VideoLifecycleManagement';
import VideoPlaybackApp from '@/components/VideoPlaybackApp';

const PLMDashboard: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        <div className="flex-1 p-6 space-y-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-purple-900">Video Lifecycle Management</h1>
            <p className="text-purple-700">Optimize your video's entire production cycle</p>
          </header>
          
          {/* Insert the VideoPlaybackApp component for direct video playback */}
          <VideoPlaybackApp />
          
          <VideoLifecycleManagement />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PLMDashboard;
