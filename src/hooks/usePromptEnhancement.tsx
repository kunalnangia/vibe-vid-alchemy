
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export const usePromptEnhancement = () => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { user } = useAuth();
  
  const enhancePrompt = async (prompt: string, videoContext?: string): Promise<string> => {
    if (!prompt) {
      toast.error('Please enter a script idea to enhance');
      return '';
    }
    
    setIsEnhancing(true);
    
    try {
      // If not authenticated or in preview mode, use a mock enhancement
      if (!user && (window.location.hostname.includes('lovable.dev') || 
          window.location.hostname.includes('localhost'))) {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Add artificial delay
        toast.success('Script idea enhanced!');
        return prompt + ' [Enhanced with creative descriptions, engaging narrative, and improved structure for better viewer engagement]';
      }
      
      const { data, error } = await supabase.functions.invoke('enhance-prompt', {
        body: { prompt, videoContext },
      });
      
      if (error) {
        console.error('Error enhancing prompt:', error);
        toast.error('Failed to enhance script: ' + error.message);
        return prompt;
      }
      
      if (data?.enhancedPrompt) {
        toast.success('Script idea enhanced!');
        return data.enhancedPrompt;
      } else {
        toast.error('Unable to enhance script idea');
        return prompt;
      }
    } catch (error) {
      console.error('Error enhancing prompt:', error);
      toast.error('Failed to connect to enhancement service');
      return prompt;
    } finally {
      setIsEnhancing(false);
    }
  };
  
  return {
    enhancePrompt,
    isEnhancing
  };
};
