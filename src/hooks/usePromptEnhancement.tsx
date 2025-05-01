
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const usePromptEnhancement = () => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  const enhancePrompt = async (prompt: string, videoContext?: string): Promise<string> => {
    if (!prompt) {
      toast.error('Please enter a script idea to enhance');
      return '';
    }
    
    setIsEnhancing(true);
    
    try {
      // Try to use the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('enhance-prompt', {
        body: { prompt, videoContext },
      });
      
      if (error) {
        console.error('Supabase Edge Function error:', error);
        throw new Error(error.message);
      }
      
      if (data?.enhancedPrompt) {
        toast.success('Script idea enhanced!');
        return data.enhancedPrompt;
      } else {
        // Fallback to client-side enhancement if edge function returns no data
        console.log('No data returned from edge function, using fallback enhancement');
        return clientSideFallbackEnhancement(prompt);
      }
    } catch (error) {
      console.error('Error enhancing prompt:', error);
      
      // Use client-side fallback if the edge function fails
      console.log('Using client-side fallback enhancement due to error');
      return clientSideFallbackEnhancement(prompt);
    } finally {
      setIsEnhancing(false);
    }
  };
  
  // Client-side fallback enhancement when the edge function is not available
  const clientSideFallbackEnhancement = (prompt: string): string => {
    console.log('Using client-side enhancement fallback');
    let enhancedPrompt = prompt.trim();
    
    // Add professional opening if missing
    if (!enhancedPrompt.toLowerCase().includes('introduction') && !enhancedPrompt.toLowerCase().includes('intro')) {
      enhancedPrompt = `Introduction: ${enhancedPrompt}`;
    }
    
    // Add structure if it seems like just a raw idea
    if (!enhancedPrompt.includes('\n') && !enhancedPrompt.includes('.')) {
      enhancedPrompt = `${enhancedPrompt}\n\nMain Points:\n1. Establish the context and background\n2. Present the core message clearly\n3. Include compelling visuals and examples\n4. End with a strong call to action`;
    }
    
    // Add closing thoughts
    if (!enhancedPrompt.toLowerCase().includes('conclusion')) {
      enhancedPrompt = `${enhancedPrompt}\n\nConclusion: Thank viewers and include a clear call to action to increase engagement.`;
    }
    
    // Add production notes
    enhancedPrompt = `${enhancedPrompt}\n\n[Enhanced with AI: Improved structure, professional tone, and engagement tactics applied. Optimized for viewer retention and clear messaging.]`;
    
    return enhancedPrompt;
  };

  return {
    enhancePrompt,
    isEnhancing
  };
};

// Export the enhancePrompt function directly for use in other files
export const enhancePrompt = async (prompt: string, videoContext?: string): Promise<string> => {
  const { enhancePrompt: enhance } = usePromptEnhancement();
  return enhance(prompt, videoContext);
};

export default usePromptEnhancement;
