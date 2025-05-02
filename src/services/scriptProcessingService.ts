
export interface ScriptProcessingSettings {
  tone: string;
  duration: string;
  mood: string;
}

export interface SceneData {
  id: number;
  title: string;
  description: string;
  duration: string;
  shotType?: string;
  stockFootageKeywords?: string[];
}

export interface MusicData {
  id: string;
  title: string;
  artist: string;
  duration: string;
  mood: string;
  url?: string;
}

export interface VoiceoverData {
  id: string;
  name: string;
  gender: string;
  style: string;
  language: string;
  sampleUrl?: string;
}

export interface ProcessedScriptData {
  estimatedDuration: string;
  scenes: SceneData[];
  musicSuggestions: MusicData[];
  voiceoverSuggestions: VoiceoverData[];
}

// Process script with AI to generate scene breakdown, music, and voiceover suggestions
export const processScript = async (
  scriptText: string, 
  settings: ScriptProcessingSettings
): Promise<ProcessedScriptData> => {
  // In a production app, this would call an AI API
  // For now, we'll return mock data based on the script input
  
  console.log("Processing script with settings:", settings);
  
  // Simple word count to estimate duration
  const wordCount = scriptText.split(/\s+/).length;
  const estimatedSeconds = Math.max(30, Math.min(300, wordCount * 0.5));
  const minutes = Math.floor(estimatedSeconds / 60);
  const seconds = Math.floor(estimatedSeconds % 60);
  
  // Generate mock scenes based on script content
  const scenes: SceneData[] = [];
  const sentenceRegex = /[^.!?]+[.!?]+/g;
  const sentences = scriptText.match(sentenceRegex) || [];
  
  // Create scenes from sentences (up to 5)
  const sceneCount = Math.min(sentences.length, 5);
  const sceneDuration = estimatedSeconds / (sceneCount || 1);
  
  for (let i = 0; i < sceneCount; i++) {
    const sentence = sentences[i]?.trim();
    if (sentence) {
      scenes.push({
        id: i + 1,
        title: `Scene ${i + 1}`,
        description: sentence.length > 100 ? sentence.substring(0, 97) + '...' : sentence,
        duration: `${Math.floor(sceneDuration)}s`,
        shotType: ['Wide Shot', 'Medium Shot', 'Close-Up', 'Tracking Shot', 'Aerial View'][i % 5],
        stockFootageKeywords: sentence.split(/\s+/).filter(word => word.length > 4).slice(0, 3)
      });
    }
  }
  
  // Mock music suggestions based on tone/mood
  const musicSuggestions: MusicData[] = [
    {
      id: "music-1",
      title: `${settings.mood.charAt(0).toUpperCase() + settings.mood.slice(1)} Corporate`,
      artist: "MusicAI",
      duration: `${minutes + 1}:${seconds.toString().padStart(2, '0')}`,
      mood: settings.mood,
      url: "https://example.com/music/track1.mp3"
    },
    {
      id: "music-2",
      title: `${settings.tone.charAt(0).toUpperCase() + settings.tone.slice(1)} Background`,
      artist: "SoundStudio",
      duration: `${minutes}:${(seconds + 30) % 60}`,
      mood: settings.mood,
      url: "https://example.com/music/track2.mp3"
    },
    {
      id: "music-3",
      title: "Dynamic Presentation",
      artist: "AudioLabs",
      duration: `${minutes + 2}:${seconds.toString().padStart(2, '0')}`,
      mood: settings.mood === "bright" ? "energetic" : settings.mood,
      url: "https://example.com/music/track3.mp3"
    }
  ];
  
  // Mock voiceover talent suggestions
  const voiceoverSuggestions: VoiceoverData[] = [
    {
      id: "voice-1",
      name: "Alex Johnson",
      gender: "Male",
      style: settings.tone === "professional" ? "Corporate" : "Conversational",
      language: "English (US)",
      sampleUrl: "https://example.com/voices/alex.mp3"
    },
    {
      id: "voice-2",
      name: "Sophia Chen",
      gender: "Female",
      style: settings.tone === "friendly" ? "Warm" : "Professional",
      language: "English (US)",
      sampleUrl: "https://example.com/voices/sophia.mp3"
    },
    {
      id: "voice-3",
      name: "Michael Rodriguez",
      gender: "Male",
      style: settings.tone === "dramatic" ? "Cinematic" : "Engaging",
      language: "English (UK)",
      sampleUrl: "https://example.com/voices/michael.mp3"
    }
  ];
  
  // Wait a bit to simulate AI processing time
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    estimatedDuration: `${minutes}:${seconds.toString().padStart(2, '0')}`,
    scenes,
    musicSuggestions,
    voiceoverSuggestions
  };
};

// Generate a full script from a brief idea
export const generateScript = async (
  scriptIdea: string,
  settings: ScriptProcessingSettings
): Promise<string> => {
  // In a production app, this would call a real AI API
  // For now, we'll return enhanced mock text
  
  console.log("Generating script with settings:", settings);
  
  // Basic script template based on idea and settings
  const intro = `[OPENING SCENE - ${settings.mood.toUpperCase()}]\n\n`;
  const body = `We're excited to present ${scriptIdea}. Our approach combines innovation with practicality, delivering solutions that work for you.\n\n`;
  const middle = `[MIDDLE SECTION]\n\nThe key benefits include enhanced productivity, streamlined operations, and significant cost savings. Our customers have reported 30% improvement in overall performance.\n\n`;
  const conclusion = `[CONCLUSION]\n\nContact us today to learn how we can help transform your business with our cutting-edge solutions.`;
  
  // Wait to simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return intro + body + middle + conclusion;
};
