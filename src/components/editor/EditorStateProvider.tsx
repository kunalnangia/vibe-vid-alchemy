
import React from 'react';
import { useEditorPlayback } from '@/hooks/useEditorPlayback';
import { useEditorOverlays } from '@/hooks/useEditorOverlays';
import { useEditorClips } from '@/hooks/useEditorClips';
import { useEditorActions } from '@/hooks/useEditorActions';

interface EditorState {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
  duration: number;
  scriptIdea: string;
  setScriptIdea: (scriptIdea: string) => void;
  videoTitle: string;
  setVideoTitle: (videoTitle: string) => void;
  views: number;
  clicks: number;
  selectedClipId: string | null;
  setSelectedClipId: (id: string | null) => void;
  textOverlays: any[];
  setTextOverlays: (overlays: any[]) => void;
  selectedOverlayId: string | null;
  setSelectedOverlayId: (id: string | null) => void;
  clips: any[];
  setClips: (clips: any[]) => void;
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
  handleUpload: () => void;
  handleRecord: () => void;
  handlePlay: () => void;
  handleSliderChange: (value: number[]) => void;
  handleTrimVideo: () => void;
  handleCropFrame: () => void;
  handleInsertToken: () => void;
  handleConnectCRM: () => void;
  handleConnectSalesforce: () => void;
  handleSplitClip: () => void;
  handleExport: () => void;
  handlePublishLanding: () => void;
  handleDownloadAnalytics: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTextOverlay: () => void;
  updateTextOverlay: (id: string, updates: any) => void;
}

interface EditorStateProviderProps {
  children: (state: EditorState) => React.ReactNode;
}

const EditorStateProvider: React.FC<EditorStateProviderProps> = ({ children }) => {
  // Use the custom hooks
  const playback = useEditorPlayback();
  const overlays = useEditorOverlays();
  const clips = useEditorClips();
  const actions = useEditorActions();
  
  // Combine all states and actions from the hooks
  const state: EditorState = {
    ...playback,
    ...overlays,
    ...clips,
    ...actions
  };
  
  return <>{children(state)}</>;
};

export default EditorStateProvider;
