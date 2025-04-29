
import VideoEditor from "@/components/VideoEditor";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <VideoEditor />
      </div>
    </SidebarProvider>
  );
};

export default Index;
