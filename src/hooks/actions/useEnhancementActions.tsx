
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import usePromptEnhancement from '../usePromptEnhancement';

interface EnhancementActionsProps {
  scriptIdea: string;
  setScriptIdea: (script: string) => void;
}

export const useEnhancementActions = ({
  scriptIdea,
  setScriptIdea
}: EnhancementActionsProps) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { enhancePrompt, isEnhancing: isPromptEnhancing } = usePromptEnhancement();
  
  // Enhance with AI - Improve script and generate suggestions
  const handleAIEnhance = useCallback(async () => {
    if (!scriptIdea) {
      toast.error("Please add a script idea first before enhancing");
      return;
    }
    
    setIsEnhancing(true);
    toast("Enhancing your script with AI...");
    
    try {
      // Enhance the script using the prompt enhancement hook
      const enhancedScript = await enhancePrompt(scriptIdea);
      
      if (enhancedScript) {
        setScriptIdea(enhancedScript);
        toast.success("Script enhanced successfully!");
        
        // Show recommendations
        setTimeout(() => {
          toast.info("AI suggests adding B-roll for increased engagement", {
            duration: 5000,
          });
        }, 1000);
        
        setTimeout(() => {
          toast.info("Consider adding music that matches the tone of your message", {
            duration: 5000,
          });
        }, 2500);
      }
    } catch (error) {
      console.error("Error enhancing script:", error);
      toast.error("Failed to enhance script. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  }, [scriptIdea, setScriptIdea, enhancePrompt]);
  
  // Auto generate captions
  const handleAutoCaption = useCallback(() => {
    setIsProcessing(true);
    toast("Generating captions from video audio...");
    
    // Simulate caption generation with a timeout
    setTimeout(() => {
      toast.success("Captions generated successfully!");
      setIsProcessing(false);
    }, 3000);
  }, []);
  
  // Green screen functionality 
  const handleGreenScreen = useCallback(() => {
    toast.info("Green screen mode activated. Upload a video with green background to use this feature.");
  }, []);
  
  // Magic resize for different platforms
  const handleMagicResize = useCallback(() => {
    setIsProcessing(true);
    toast("Preparing to resize your video for multiple platforms...");
    
    // Simulate platform optimization process
    setTimeout(() => {
      toast.success("Video optimized for Instagram, TikTok, YouTube Shorts, and LinkedIn");
      setIsProcessing(false);
      
      // Show platforms where the video has been optimized for
      toast("Content optimized for multiple platforms. Check the export tab to publish.", {
        duration: 5000,
      });
    }, 2500);
  }, []);

  // Return all actions
  return {
    handleAIEnhance,
    handleAutoCaption,
    handleGreenScreen,
    handleMagicResize,
    isEnhancing: isEnhancing || isPromptEnhancing,
    isProcessing
  };
};

export default useEnhancementActions;
