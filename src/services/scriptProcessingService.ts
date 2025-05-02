
export interface ScriptProcessingSettings {
  tone: string;
  duration: string;
  mood: string;
}

export interface SceneData {
  id: number;
  content: string;
  description: string;
  duration: string;
  suggestedFootage?: string[];
}

export interface MusicData {
  id: string;
  name: string;
  duration: string;
  mood: string;
  previewUrl: string;
}

export interface VoiceoverData {
  id: string;
  name: string;
  gender: string;
  accent: string;
  previewUrl: string;
}

export interface ProcessedScriptData {
  estimatedDuration: string;
  scenes: SceneData[];
  musicSuggestions: MusicData[];
  voiceoverSuggestions: VoiceoverData[];
}

// Process script to generate scenes, music, and voiceover suggestions
export const processScript = async (
  scriptIdea: string, 
  settings: ScriptProcessingSettings
): Promise<ProcessedScriptData> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate estimated duration based on script length and settings
  const wordCount = scriptIdea.trim().split(/\s+/).length;
  const durationSeconds = 
    settings.duration.includes("60 seconds") ? 60 :
    settings.duration.includes("2 minutes") ? 120 :
    settings.duration.includes("5 minutes") ? 300 : 60;
  
  // Generate scene breakdown
  const sceneCount = Math.max(3, Math.min(8, Math.ceil(wordCount / 50)));
  const scenes: SceneData[] = [];
  
  // Split script into sentences for scenes
  const sentences = scriptIdea
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|");
  
  let currentScene = 1;
  let currentSentenceIndex = 0;
  let sceneDurationSoFar = 0;
  
  while (currentScene <= sceneCount && currentSentenceIndex < sentences.length) {
    // Calculate scene duration as a proportion of total duration
    const sceneDuration = Math.floor(durationSeconds / sceneCount);
    sceneDurationSoFar += sceneDuration;
    
    // Get sentences for this scene
    const sentencesPerScene = Math.ceil(sentences.length / sceneCount);
    const sceneContent = sentences
      .slice(currentSentenceIndex, currentSentenceIndex + sentencesPerScene)
      .join(" ")
      .trim();
    
    currentSentenceIndex += sentencesPerScene;
    
    // Generate a description based on the content
    const keywords = extractKeywords(sceneContent);
    const visualDescription = generateVisualDescription(keywords, settings.mood);
    
    scenes.push({
      id: currentScene,
      content: sceneContent || `Scene ${currentScene}`,
      description: visualDescription,
      duration: `${sceneDuration} seconds`,
      suggestedFootage: generateSuggestedFootage(keywords, settings.mood)
    });
    
    currentScene++;
  }
  
  // Generate music suggestions based on tone and duration
  const musicSuggestions = generateMusicSuggestions(settings.tone, settings.mood);
  
  // Generate voiceover suggestions based on tone
  const voiceoverSuggestions = generateVoiceoverSuggestions(settings.tone);
  
  return {
    estimatedDuration: formatDuration(durationSeconds),
    scenes,
    musicSuggestions,
    voiceoverSuggestions
  };
};

// Generate a complete script from a brief idea
export const generateScript = async (
  idea: string, 
  settings: ScriptProcessingSettings
): Promise<string> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  // Generate a script based on the idea and settings
  const tone = settings.tone.toLowerCase();
  const duration = settings.duration.toLowerCase();
  const mood = settings.mood.toLowerCase();
  
  // Generate introduction
  let script = `# ${idea}\n\n`;
  
  // Add script tone and mood information
  script += `*A ${tone} video with ${mood} visuals - ${duration}*\n\n`;
  
  // Generate introduction
  script += `## Introduction (0:00 - 0:30)\n`;
  script += `- Open with an engaging hook about "${idea}"\n`;
  script += `- Introduce the main topic and its importance\n`;
  script += `- Briefly outline what viewers will learn\n\n`;
  
  // Generate body content
  if (duration.includes("60 seconds")) {
    script += `## Main Content (0:30 - 0:50)\n`;
    script += `- Present the key point related to ${idea}\n`;
    script += `- Show a brief demonstration or example\n`;
    script += `- Highlight the main benefit or value proposition\n\n`;
    
    script += `## Conclusion (0:50 - 1:00)\n`;
    script += `- Summarize the main takeaway\n`;
    script += `- Include a clear call to action\n`;
    script += `- End with your brand signature or tagline\n\n`;
  } else {
    script += `## Main Content (0:30 - 2:30)\n`;
    script += `- Present the first key point related to ${idea}\n`;
    script += `- Provide supporting evidence or examples\n`;
    script += `- Introduce the second key concept\n`;
    script += `- Demonstrate practical applications\n`;
    script += `- Address potential questions or concerns\n`;
    script += `- Share relevant statistics or case studies\n\n`;
    
    script += `## Conclusion (2:30 - 3:00)\n`;
    script += `- Summarize the main points covered\n`;
    script += `- Reinforce the primary value proposition\n`;
    script += `- Include a compelling call to action\n`;
    script += `- End with your brand message and contact information\n\n`;
  }
  
  // Add visual notes
  script += `## Visual Notes\n`;
  script += `- Use ${mood} visuals throughout the video\n`;
  script += `- Include on-screen text for key points\n`;
  script += `- Add lower-third graphics for statistics and quotes\n`;
  script += `- Maintain consistent branding elements\n`;
  script += `- End with logo animation and contact details\n\n`;
  
  return script;
};

// Helper functions
function extractKeywords(text: string): string[] {
  // Simple keyword extraction based on common words
  const words = text.toLowerCase().split(/\W+/);
  const commonWords = new Set([
    'the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'you', 'that',
    'was', 'for', 'on', 'are', 'with', 'as', 'this', 'be', 'at', 'have'
  ]);
  
  return words
    .filter(word => word.length > 3 && !commonWords.has(word))
    .slice(0, 5);
}

function generateVisualDescription(keywords: string[], mood: string): string {
  const visualTemplates = [
    `Close-up shot of {keyword1} with ${mood} lighting`,
    `Wide angle view showing {keyword1} and {keyword2}`,
    `Person demonstrating {keyword1} in a ${mood} setting`,
    `${mood} montage featuring {keyword1}`,
    `Animated graphic explaining {keyword1} and {keyword2}`,
    `Slow motion footage of {keyword1} with ${mood} effect`,
    `Split screen comparing {keyword1} and {keyword2}`
  ];
  
  const template = visualTemplates[Math.floor(Math.random() * visualTemplates.length)];
  
  return template
    .replace('{keyword1}', keywords[0] || 'subject')
    .replace('{keyword2}', keywords[1] || 'concept');
}

function generateSuggestedFootage(keywords: string[], mood: string): string[] {
  return keywords.map(keyword => `${mood} ${keyword} footage`);
}

function generateMusicSuggestions(tone: string, mood: string): MusicData[] {
  const tracks = [
    {
      id: "music-1",
      name: `${mood} Corporate`,
      duration: "3:24",
      mood: tone,
      previewUrl: "https://example.com/preview1.mp3"
    },
    {
      id: "music-2",
      name: `${mood} Technology`,
      duration: "2:52",
      mood: tone,
      previewUrl: "https://example.com/preview2.mp3"
    },
    {
      id: "music-3",
      name: `${mood} Inspirational`,
      duration: "4:12",
      mood: tone,
      previewUrl: "https://example.com/preview3.mp3"
    },
    {
      id: "music-4",
      name: `${mood} Ambient`,
      duration: "3:45",
      mood: tone,
      previewUrl: "https://example.com/preview4.mp3"
    }
  ];
  
  return tracks;
}

function generateVoiceoverSuggestions(tone: string): VoiceoverData[] {
  return [
    {
      id: "voice-1",
      name: "Alex Thompson",
      gender: "Male",
      accent: "American",
      previewUrl: "https://example.com/voice1.mp3"
    },
    {
      id: "voice-2",
      name: "Sophia Chen",
      gender: "Female",
      accent: "American",
      previewUrl: "https://example.com/voice2.mp3"
    },
    {
      id: "voice-3",
      name: "James Wilson",
      gender: "Male",
      accent: "British",
      previewUrl: "https://example.com/voice3.mp3"
    },
    {
      id: "voice-4",
      name: "Olivia Parker",
      gender: "Female",
      accent: "British",
      previewUrl: "https://example.com/voice4.mp3"
    }
  ];
}

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}
