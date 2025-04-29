import React from 'react';
import { AppSidebar } from './AppSidebar';
import EditorRightSidebar from './EditorRightSidebar';
import EditorHeader from './editor/EditorHeader';
import EditorTabsContainer from './editor/EditorTabsContainer';
import EditorStateProvider from './editor/EditorStateProvider';
import SidebarPanels from './SidebarPanels';

const VideoEditor: React.FC = () => {
  return (
    <>
      <AppSidebar />
      
      <EditorStateProvider>
        {(editorState) => (
          <div className="flex flex-1 p-6">
            <div className="flex-1 pr-4 space-y-6">
              {/* Top Navigation */}
              <EditorHeader />
              
              {/* Editor Content */}
              <EditorTabsContainer 
                videoTitle={editorState.videoTitle}
                setVideoTitle={editorState.setVideoTitle}
                scriptIdea={editorState.scriptIdea}
                setScriptIdea={editorState.setScriptIdea}
                isPlaying={editorState.isPlaying}
                setIsPlaying={editorState.setIsPlaying}
                currentTime={editorState.currentTime}
                setCurrentTime={editorState.setCurrentTime}
                duration={editorState.duration}
                views={editorState.views}
                clicks={editorState.clicks}
                selectedClipId={editorState.selectedClipId}
                handleUpload={editorState.handleUpload}
                handleRecord={editorState.handleRecord}
                handlePlay={editorState.handlePlay}
                handleSliderChange={editorState.handleSliderChange}
                handleSplitClip={editorState.handleSplitClip}
                handleExport={editorState.handleExport}
                handleDownloadAnalytics={editorState.handleDownloadAnalytics}
              />
            </div>
            
            {/* Right sidebar - always shown regardless of tab */}
            <EditorRightSidebar
              videoTitle={editorState.videoTitle}
              setVideoTitle={editorState.setVideoTitle}
              handleTrimVideo={editorState.handleTrimVideo}
              handleCropFrame={editorState.handleCropFrame}
              handleInsertToken={editorState.handleInsertToken}
              handleConnectCRM={editorState.handleConnectCRM}
              handleConnectSalesforce={editorState.handleConnectSalesforce}
              handlePublishLanding={editorState.handlePublishLanding}
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
    </>
  );
};

export default VideoEditor;
