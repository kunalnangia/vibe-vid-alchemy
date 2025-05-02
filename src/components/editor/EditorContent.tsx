
import React from 'react';
import VideoPreview from '../VideoPreview';
import VideoControls from '../VideoControls';
import ScriptIdeaSection from '../ScriptIdeaSection';
import UploadSection from '../UploadSection';
import EditorTabsContainer from './EditorTabsContainer';
import AnalyticsSection from '../AnalyticsSection';

interface EditorContentProps {
  editorState: any;
}

const EditorContent: React.FC<EditorContentProps> = ({ editorState }) => {
  return (
    <div className="flex-1 pr-4 space-y-6">
      {/* Video Preview Area - Moved to top */}
      <div className="flex justify-center p-4">
        <VideoPreview
          clips={editorState.clips}
          textOverlays={editorState.textOverlays || []}
          currentTime={editorState.currentTime}
          setCurrentTime={editorState.setCurrentTime}
          isPlaying={editorState.isPlaying}
          setIsPlaying={editorState.setIsPlaying}
          projectDuration={editorState.duration || 25}
          currentFilter={editorState.currentFilter || 'normal'}
          aspectRatio={editorState.aspectRatio || 'landscape'}
          greenScreenEnabled={editorState.greenScreenEnabled || false}
        />
      </div>
      
      {/* Video Controls - Only shown when clips are available */}
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
      
      {/* Script Idea Section */}
      <ScriptIdeaSection
        scriptIdea={editorState.scriptIdea}
        setScriptIdea={editorState.setScriptIdea}
      />
      
      {/* Upload Section - Only shown when no clips */}
      {editorState.clips.length === 0 && (
        <UploadSection
          handleUpload={editorState.handleUpload}
          handleRecord={editorState.handleRecord}
        />
      )}
      
      {/* Editor Tabs Container */}
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
      
      {/* Analytics section - moved to the end of the page */}
      <AnalyticsSection
        views={editorState.views}
        clicks={editorState.clicks}
        handleDownloadAnalytics={editorState.handleDownloadAnalytics}
      />
    </div>
  );
};

export default EditorContent;
