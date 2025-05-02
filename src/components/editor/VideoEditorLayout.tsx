
import React from 'react';
import { AppSidebar } from '../AppSidebar';
import EditorRightSidebar from '../EditorRightSidebar';
import EditorHeader from './EditorHeader';
import SidebarPanels from '../SidebarPanels';
import EditorContent from './EditorContent';
import { SidebarProvider } from "@/components/ui/sidebar";
import EditorStateProvider from './EditorStateProvider';
import { toast } from 'sonner';

interface VideoEditorLayoutProps {
  videoState?: {
    currentFilter: string;
    setCurrentFilter: (filter: string) => void;
    aspectRatio: string;
    setAspectRatio: (ratio: string) => void;
    greenScreenEnabled: boolean;
    setGreenScreenEnabled: (enabled: boolean) => void;
    toggleGreenScreen: () => void;
    autoCaptionsEnabled: boolean;
    setAutoCaptionsEnabled: (enabled: boolean) => void;
    toggleAutoCaptions: () => void;
  }
}

const VideoEditorLayout: React.FC<VideoEditorLayoutProps> = ({ 
  videoState = {
    currentFilter: 'normal',
    setCurrentFilter: () => {},
    aspectRatio: 'landscape',
    setAspectRatio: () => {},
    greenScreenEnabled: false,
    setGreenScreenEnabled: () => {},
    toggleGreenScreen: () => {},
    autoCaptionsEnabled: false,
    setAutoCaptionsEnabled: () => {},
    toggleAutoCaptions: () => {}
  }
}) => {
  // Handle unexpected errors during rendering
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Runtime error detected:', event.error);
      toast.error('Something went wrong', {
        description: 'The editor encountered an error. Please refresh the page.',
        duration: 5000
      });
      
      // Prevent default browser error handling
      event.preventDefault();
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        
        <EditorStateProvider>
          {(editorState) => (
            <div className="flex flex-1 p-6 bg-gradient-to-br from-purple-100 via-white to-fuchsia-100">
              {/* Top Navigation */}
              <EditorHeader />
              
              {/* Main content area */}
              <EditorContent 
                editorState={{
                  ...editorState,
                  currentFilter: videoState.currentFilter,
                  aspectRatio: videoState.aspectRatio,
                  greenScreenEnabled: videoState.greenScreenEnabled
                }} 
              />
              
              {/* Right sidebar */}
              <EditorRightSidebar
                videoTitle={editorState.videoTitle}
                setVideoTitle={editorState.setVideoTitle}
                handleTrimVideo={editorState.handleTrimVideo}
                handleCropFrame={editorState.handleCropFrame}
                handleInsertToken={editorState.handleInsertToken}
                handleConnectCRM={editorState.handleConnectCRM}
                handleConnectSalesforce={editorState.handleConnectSalesforce}
                handlePublishLanding={editorState.handlePublishLanding}
                handleAIEnhance={editorState.handleAIEnhance}
                handleAutoCaption={() => {
                  editorState.handleAutoCaption();
                  videoState.toggleAutoCaptions();
                }}
                handleGreenScreen={() => {
                  editorState.handleGreenScreen();
                  videoState.toggleGreenScreen();
                }}
                handleMagicResize={editorState.handleMagicResize}
              />
            </div>
          )}
        </EditorStateProvider>

        {/* SidebarPanels component needs to be included to keep functionality */}
        <EditorStateProvider>
          {(editorState) => (
            <div className="hidden">
              <SidebarPanels
                handleFileUpload={editorState.handleFileUpload}
                addTextOverlay={editorState.addTextOverlay}
                selectedOverlayId={editorState.selectedOverlayId}
                textOverlays={editorState.textOverlays}
                onUpdateOverlay={editorState.updateTextOverlay}
                selectedClipId={editorState.selectedClipId}
                setSelectedClipId={editorState.setSelectedClipId}
                clips={editorState.clips}
              />
            </div>
          )}
        </EditorStateProvider>
      </div>
    </SidebarProvider>
  );
};

export default VideoEditorLayout;
