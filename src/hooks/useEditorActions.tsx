
import { useState } from 'react';
import { useBasicActions } from './actions/useBasicActions';
import { useEditingActions } from './actions/useEditingActions';
import { usePersonalizationActions } from './actions/usePersonalizationActions';
import { useEnhancementActions } from './actions/useEnhancementActions';

interface UseEditorActionsProps {
  currentTime?: number;
  scriptIdea: string;
  setScriptIdea: (idea: string) => void;
}

interface UseEditorActionsReturn {
  videoTitle: string;
  setVideoTitle: (title: string) => void;
  scriptIdea: string;
  setScriptIdea: (idea: string) => void;
  views: number;
  clicks: number;
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
  handleUpload: (file?: File) => void;
  handleRecord: () => void;
  handleTrimVideo: () => void;
  handleCropFrame: () => void;
  handleInsertToken: () => void;
  handleConnectCRM: () => void;
  handleConnectSalesforce: () => void;
  handleExport: () => void;
  handlePublishLanding: () => void;
  handleDownloadAnalytics: () => void;
  handleAIEnhance: () => void;
  handleAutoCaption: () => void;
  handleGreenScreen: () => void;
  handleMagicResize: () => void;
  handleSliderChange?: (value: number[]) => void;
}

export const useEditorActions = ({
  currentTime = 0,
  scriptIdea: initialScriptIdea = '',
  setScriptIdea: initialSetScriptIdea = () => {}
}: UseEditorActionsProps = {
  currentTime: 0,
  scriptIdea: '',
  setScriptIdea: () => {}
}): UseEditorActionsReturn => {
  const [localScriptIdea, setLocalScriptIdea] = useState(initialScriptIdea);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  // Import all actions from separate hook files
  const basicActions = useBasicActions();
  const editingActions = useEditingActions();
  const personalizationActions = usePersonalizationActions();
  const enhancementActions = useEnhancementActions({ 
    scriptIdea: basicActions.scriptIdea || localScriptIdea, 
    setScriptIdea: basicActions.setScriptIdea || initialSetScriptIdea || setLocalScriptIdea
  });
  
  // Create placeholder implementations for any missing required methods
  const handleUpload = basicActions.handleUpload || ((file?: File) => {
    console.log("Upload not implemented");
  });
  
  const handleRecord = basicActions.handleRecord || (() => {
    console.log("Record not implemented");
  });
  
  // Handle slider changes
  const handleSliderChange = (value: number[]) => {
    if (editingActions.handleSliderChange) {
      editingActions.handleSliderChange(value);
    }
  };
  
  // Combine all actions and return them
  return {
    videoTitle: basicActions.videoTitle || '',
    setVideoTitle: basicActions.setVideoTitle || (() => {}),
    scriptIdea: basicActions.scriptIdea || localScriptIdea,
    setScriptIdea: basicActions.setScriptIdea || initialSetScriptIdea || setLocalScriptIdea,
    views: basicActions.views || 0,
    clicks: basicActions.clicks || 0,
    activeTool: activeTool,
    setActiveTool: setActiveTool,
    handleUpload,
    handleRecord,
    handleTrimVideo: editingActions.handleTrimVideo || (() => {}),
    handleCropFrame: editingActions.handleCropFrame || (() => {}),
    handleInsertToken: personalizationActions.handleInsertToken || (() => {}),
    handleConnectCRM: personalizationActions.handleConnectCRM || (() => {}),
    handleConnectSalesforce: personalizationActions.handleConnectSalesforce || (() => {}),
    handleExport: basicActions.handleExport || (() => {}),
    handlePublishLanding: personalizationActions.handlePublishLanding || (() => {}),
    handleDownloadAnalytics: basicActions.handleDownloadAnalytics || (() => {}),
    handleAIEnhance: enhancementActions.handleAIEnhance || (() => {}),
    handleAutoCaption: enhancementActions.handleAutoCaption || (() => {}),
    handleGreenScreen: enhancementActions.handleGreenScreen || (() => {}),
    handleMagicResize: enhancementActions.handleMagicResize || (() => {}),
    handleSliderChange
  };
};

export default useEditorActions;
