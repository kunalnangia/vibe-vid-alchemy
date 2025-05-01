
import React from 'react';
import VideoToolbar from '../VideoToolbar';
import VideoPreviewPlaceholder from '../VideoPreviewPlaceholder';

interface EditorMainViewProps {
  scriptIdea: string;
  setScriptIdea: (value: string) => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  views: number;
  clicks: number;
  selectedClipId: string | null;
  handleUpload: (file: File) => void;
  handleRecord: () => void;
  handlePlay: () => void;
  handleSliderChange: (value: number[]) => void;
  handleSplitClip: () => void;
  handleExport: () => void;
  handleDownloadAnalytics: () => void;
}

const EditorMainView: React.FC<EditorMainViewProps> = ({
  selectedClipId,
  handleSplitClip,
  handleExport,
}) => {
  return (
    <>
      {/* Video Toolbar */}
      <VideoToolbar 
        onSplit={handleSplitClip}
        onExport={handleExport}
        hasSelectedClip={!!selectedClipId}
      />
      
      {/* Video preview box (just a placeholder in this view) */}
      <VideoPreviewPlaceholder />
    </>
  );
};

export default EditorMainView;
