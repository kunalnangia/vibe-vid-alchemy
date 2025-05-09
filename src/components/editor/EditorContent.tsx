
import React from 'react';
import VideoPreview from '../VideoPreview';
import VideoControls from '../VideoControls';
import ScriptIdeaSection from '../ScriptIdeaSection';
import SimpleVideoUploader from '../SimpleVideoUploader';
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
          clips={editorState.clips || []}
          textOverlays={editorState.textOverlays || []}
          currentTime={editorState.currentTime || 0}
          setCurrentTime={editorState.setCurrentTime || (() => {})}
          isPlaying={editorState.isPlaying || false}
          setIsPlaying={editorState.setIsPlaying || (() => {})}
          projectDuration={editorState.duration || 25}
          currentFilter={editorState.currentFilter || 'normal'}
          aspectRatio={editorState.aspectRatio || 'landscape'}
          greenScreenEnabled={editorState.greenScreenEnabled || false}
          autoCaptionsEnabled={editorState.autoCaptionsEnabled || false}
        />
      </div>
      
      {/* Video Controls - Only shown when clips are available */}
      {(editorState.clips || []).length > 0 && (
        <div className="max-w-3xl mx-auto">
          <VideoControls
            isPlaying={editorState.isPlaying || false}
            togglePlay={() => editorState.setIsPlaying(!editorState.isPlaying)}
            seekTo={(time) => editorState.setCurrentTime(time)}
            currentTime={editorState.currentTime || 0}
            duration={editorState.duration || 0}
          />
        </div>
      )}
      
      {/* Script Idea Section */}
      <ScriptIdeaSection
        scriptIdea={editorState.scriptIdea || ''}
        setScriptIdea={editorState.setScriptIdea || (() => {})}
      />
      
      {/* Upload Section - Only shown when no clips */}
      {(editorState.clips || []).length === 0 && (
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Upload Your Video</h2>
          <SimpleVideoUploader onFileSelected={editorState.handleUpload || (() => {})} />
        </div>
      )}
      
      {/* Editor Tabs Container */}
      <EditorTabsContainer 
        videoTitle={editorState.videoTitle || ''}
        setVideoTitle={editorState.setVideoTitle || (() => {})}
        scriptIdea={editorState.scriptIdea || ''}
        setScriptIdea={editorState.setScriptIdea || (() => {})}
        isPlaying={editorState.isPlaying || false}
        setIsPlaying={editorState.setIsPlaying || (() => {})}
        currentTime={editorState.currentTime || 0}
        setCurrentTime={editorState.setCurrentTime || (() => {})}
        duration={editorState.duration || 0}
        views={editorState.views || 0}
        clicks={editorState.clicks || 0}
        selectedClipId={editorState.selectedClipId || null}
        handleUpload={editorState.handleUpload || (() => {})}
        handleRecord={editorState.handleRecord || (() => {})}
        handlePlay={() => editorState.setIsPlaying(!editorState.isPlaying)}
        handleSliderChange={editorState.handleSliderChange || (() => {})}
        handleSplitClip={editorState.handleSplitClip || (() => {})}
        handleExport={editorState.handleExport || (() => {})}
        handleDownloadAnalytics={editorState.handleDownloadAnalytics || (() => {})}
      />
      
      {/* Analytics section - moved to the end of the page */}
      <AnalyticsSection
        views={editorState.views || 0}
        clicks={editorState.clicks || 0}
        handleDownloadAnalytics={editorState.handleDownloadAnalytics || (() => {})}
      />
    </div>
  );
};

export default EditorContent;
