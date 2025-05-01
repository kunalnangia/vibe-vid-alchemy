
import { useState } from 'react';
import { useBasicActions } from './actions/useBasicActions';
import { useEditingActions } from './actions/useEditingActions';
import { usePersonalizationActions } from './actions/usePersonalizationActions';
import { useEnhancementActions } from './actions/useEnhancementActions';

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
}

export const useEditorActions = (): UseEditorActionsReturn => {
  const [scriptIdea, setScriptIdea] = useState("");
  
  // Import all actions from separate hook files
  const basicActions = useBasicActions();
  const editingActions = useEditingActions();
  const personalizationActions = usePersonalizationActions();
  const enhancementActions = useEnhancementActions({ 
    scriptIdea: basicActions.scriptIdea || scriptIdea, 
    setScriptIdea: basicActions.setScriptIdea
  });
  
  // Combine all actions and return them
  return {
    ...basicActions,
    ...editingActions,
    ...personalizationActions,
    ...enhancementActions,
    scriptIdea: basicActions.scriptIdea || scriptIdea,
    setScriptIdea: basicActions.setScriptIdea || setScriptIdea
  };
};

export default useEditorActions;
