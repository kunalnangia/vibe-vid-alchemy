
import VideoEditor from "@/components/VideoEditor";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <div className="flex-1">
          <VideoEditor />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default Index;
