
import React from 'react';
import UploadSection from '../UploadSection';
import ScriptIdeaSection from '../ScriptIdeaSection';
import VideoToolbar from '../VideoToolbar';
import VideoPreviewPlaceholder from '../VideoPreviewPlaceholder';
import VideoPlayer from '../VideoPlayer';
import AnalyticsSection from '../AnalyticsSection';

interface EditorMainViewProps {
  scriptIdea: string;
  setScriptIdea: (value: string) => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  views: number;
  clicks: number;
  selectedClipId: string | null;
  handleUpload: () => void;
  handleRecord: () => void;
  handlePlay: () => void;
  handleSliderChange: (value: number[]) => void;
  handleSplitClip: () => void;
  handleExport: () => void;
  handleDownloadAnalytics: () => void;
}

const EditorMainView: React.FC<EditorMainViewProps> = ({
  scriptIdea,
  setScriptIdea,
  isPlaying,
  currentTime,
  duration,
  views,
  clicks,
  selectedClipId,
  handleUpload,
  handleRecord,
  handlePlay,
  handleSliderChange,
  handleSplitClip,
  handleExport,
  handleDownloadAnalytics
}) => {
  return (
    <>
      {/* Upload Video Section */}
      <UploadSection 
        handleUpload={handleUpload}
        handleRecord={handleRecord}
      />
      
      {/* Script Idea section */}
      <ScriptIdeaSection
        scriptIdea={scriptIdea}
        setScriptIdea={setScriptIdea}
      />

      {/* Video Toolbar */}
      <VideoToolbar 
        onSplit={handleSplitClip}
        onExport={handleExport}
        hasSelectedClip={!!selectedClipId}
      />
      
      {/* Video preview box */}
      <VideoPreviewPlaceholder />
      
      {/* Video progress slider */}
      <VideoPlayer
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        handlePlay={handlePlay}
        handleSliderChange={handleSliderChange}
      />
      
      {/* Analytics section */}
      <AnalyticsSection
        views={views}
        clicks={clicks}
        handleDownloadAnalytics={handleDownloadAnalytics}
      />
    </>
  );
};

export default EditorMainView;
