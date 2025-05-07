
import React from 'react';
import { useEditorPlayback } from '@/hooks/playback';
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
  handleUpload: (file?: File) => void;
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
  handleAIEnhance: () => void;
  handleAutoCaption: () => void;
  handleGreenScreen: () => void;
  handleMagicResize: () => void;
  currentFilter?: string;
  aspectRatio?: string;
  greenScreenEnabled?: boolean;
  autoCaptionsEnabled?: boolean;
}

interface EditorStateProviderProps {
  children: (state: EditorState) => React.ReactNode;
}

const EditorStateProvider: React.FC<EditorStateProviderProps> = ({ children }) => {
  // Use the custom hooks
  const playback = useEditorPlayback();
  const overlays = useEditorOverlays();
  const clips = useEditorClips();
  const [scriptIdea, setScriptIdea] = React.useState('');
  const actions = useEditorActions({
    // Pass necessary dependencies to handleSplitClip
    currentTime: playback.currentTime, 
    scriptIdea, 
    setScriptIdea
  });
  
  // Combine all states and actions from the hooks
  const state: EditorState = {
    ...playback,
    ...overlays,
    ...clips,
    ...actions,
    scriptIdea,
    setScriptIdea,
    // Add handlePlay for toggling play state
    handlePlay: playback.handleTogglePlay || (() => {
      playback.setIsPlaying(!playback.isPlaying);
    }),
    // Make sure handleSliderChange exists
    handleSliderChange: playback.handleSliderChange || actions.handleSliderChange || ((value: number[]) => {}),
    // Add handleSplitClip that uses the current time
    handleSplitClip: () => clips.handleSplitClip(playback.currentTime)
  };
  
  return <>{children(state)}</>;
};

export default EditorStateProvider;
