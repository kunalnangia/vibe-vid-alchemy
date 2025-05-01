
import React, { useState } from 'react';
import { AppSidebar } from './AppSidebar';
import EditorRightSidebar from './EditorRightSidebar';
import EditorHeader from './editor/EditorHeader';
import EditorTabsContainer from './editor/EditorTabsContainer';
import EditorStateProvider from './editor/EditorStateProvider';
import SidebarPanels from './SidebarPanels';
import { toast } from "sonner";
import VideoPreview from './VideoPreview';
import VideoControls from './VideoControls';

const VideoEditor: React.FC = () => {
  const [currentFilter, setCurrentFilter] = useState('normal');
  const [aspectRatio, setAspectRatio] = useState('landscape');

  return (
    <>
      <AppSidebar />
      
      <EditorStateProvider>
        {(editorState) => (
          <div className="flex flex-1 p-6 bg-gradient-to-br from-purple-100 via-white to-fuchsia-100">
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
                handlePlay={() => editorState.setIsPlaying(!editorState.isPlaying)}
                handleSliderChange={editorState.handleSliderChange}
                handleSplitClip={editorState.handleSplitClip}
                handleExport={editorState.handleExport}
                handleDownloadAnalytics={editorState.handleDownloadAnalytics}
              />

              {/* Display video preview when clips are available */}
              <div className="flex justify-center p-4">
                <VideoPreview
                  clips={editorState.clips}
                  textOverlays={editorState.textOverlays || []}
                  currentTime={editorState.currentTime}
                  setCurrentTime={editorState.setCurrentTime}
                  isPlaying={editorState.isPlaying}
                  setIsPlaying={editorState.setIsPlaying}
                  projectDuration={editorState.duration || 25}
                  currentFilter={currentFilter}
                  aspectRatio={aspectRatio}
                />
              </div>
              
              {/* Video controls */}
              {editorState.clips.length > 0 && (
                <div className="max-w-3xl mx-auto">
                  <VideoControls
                    isPlaying={editorState.isPlaying}
                    togglePlay={() => editorState.setIsPlaying(!editorState.isPlaying)}
                    seekTo={(time) => editorState.setCurrentTime(time)}
                    currentTime={editorState.currentTime}
                    duration={editorState.duration}
                  />
                </div>
              )}
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
              handleAIEnhance={editorState.handleAIEnhance || (() => {})}
              handleAutoCaption={editorState.handleAutoCaption || (() => {})}
              handleGreenScreen={editorState.handleGreenScreen || (() => {})}
              handleMagicResize={editorState.handleMagicResize || (() => {})}
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
