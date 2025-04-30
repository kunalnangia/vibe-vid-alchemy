
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const usePromptEnhancement = () => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  const enhancePrompt = async (prompt: string, videoContext?: string): Promise<string> => {
    if (!prompt) {
      toast.error('Please enter a script idea to enhance');
      return '';
    }
    
    setIsEnhancing(true);
    
    try {
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
