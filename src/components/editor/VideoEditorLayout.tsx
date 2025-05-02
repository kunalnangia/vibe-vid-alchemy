import React from 'react';
import { AppSidebar } from '../AppSidebar';
import EditorRightSidebar from '../EditorRightSidebar';
import EditorHeader from './EditorHeader';
import SidebarPanels from '../SidebarPanels';
import EditorContent from './EditorContent';
import { SidebarProvider } from "@/components/ui/sidebar";
import EditorStateProvider from './EditorStateProvider';

const VideoEditorLayout: React.FC = () => {
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
              <EditorContent editorState={editorState} />
              
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
                handleAutoCaption={editorState.handleAutoCaption}
                handleGreenScreen={editorState.handleGreenScreen}
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
