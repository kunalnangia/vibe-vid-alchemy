import VideoEditor from "@/components/VideoEditor";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold text-purple-900 mb-4">Video Editor</h1>
          
          {/* Keep the original VideoEditor component */}
          <VideoEditor />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
