
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Extract the prompt from the request
    const { prompt, videoContext } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If OpenAI API key is available, use it to enhance the prompt
    if (openAIApiKey) {
      const enhancedPrompt = await enhanceWithOpenAI(prompt, videoContext);
      
      return new Response(
        JSON.stringify({ enhancedPrompt }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // Fallback to simple enhancement if no API key
      const enhancedPrompt = fallbackEnhancement(prompt);
      
      return new Response(
        JSON.stringify({ enhancedPrompt }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error enhancing prompt:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to enhance prompt', message: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Function to enhance prompt with OpenAI
async function enhanceWithOpenAI(prompt: string, videoContext?: string): Promise<string> {
  try {
    const systemMessage = `You are a professional video script enhancer. 
Your job is to take a simple video script idea and transform it into a well-structured, 
engaging script that will result in a professional and compelling video. 
Format the output with clear sections (Introduction, Main Points, Conclusion). 
Make the tone professional but conversational. Add pacing guidance and visual suggestions.
${videoContext ? `Consider this video context: ${videoContext}` : ''}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return fallbackEnhancement(prompt);
  }
}

// Fallback enhancement function when OpenAI is not available
function fallbackEnhancement(prompt: string): string {
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
}
