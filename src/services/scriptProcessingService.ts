
import { toast } from "sonner";

// Types for script processing
export interface SceneData {
  id: number;
  title: string;
  description: string;
  duration: string;
  visualReferences?: string[];
}

export interface MusicData {
  id: string;
  title: string;
  duration: string;
  category: string;
  audioSrc?: string;
}

export interface VoiceoverData {
  id: string;
  name: string;
  gender: string;
  style: string;
  sampleAudio?: string;
}

export interface ProcessedScriptData {
  scenes: SceneData[];
  musicSuggestions: MusicData[];
  voiceoverSuggestions: VoiceoverData[];
  estimatedDuration: string;
}

export interface ScriptProcessingSettings {
  tone: string;
  duration: string;
  mood: string;
}

// Mock data for demonstration purposes
const mockScenes: SceneData[] = [
  { id: 1, title: "Introduction", description: "Engaging hook highlighting problem", duration: "0:10" },
  { id: 2, title: "Problem Statement", description: "Define pain points clearly with visuals", duration: "0:15" },
  { id: 3, title: "Solution Introduction", description: "Introduce product with key benefits", duration: "0:20" },
  { id: 4, title: "Feature Showcase", description: "Demonstrate top 3 features with screen recordings", duration: "0:30" },
  { id: 5, title: "Customer Testimonial", description: "Short quote with customer result", duration: "0:15" },
  { id: 6, title: "Call to Action", description: "Clear next steps with special offer", duration: "0:10" }
];

const mockMusic: MusicData[] = [
  { id: "m1", title: "Corporate Innovation", duration: "2:30", category: "Corporate" },
  { id: "m2", title: "Digital Product Reveal", duration: "2:15", category: "Technology" },
  { id: "m3", title: "Upbeat Motivation", duration: "1:45", category: "Inspirational" },
  { id: "m4", title: "Soft Background", duration: "3:00", category: "Ambient" }
];

const mockVoiceovers: VoiceoverData[] = [
  { id: "v1", name: "James", gender: "Male", style: "Professional" },
  { id: "v2", name: "Sarah", gender: "Female", style: "Conversational" },
  { id: "v3", name: "Alex", gender: "Male", style: "Energetic" },
  { id: "v4", name: "Emma", gender: "Female", style: "Authoritative" }
];

// Function to process script with OpenAI API
export const processScript = async (
  scriptText: string, 
  settings: ScriptProcessingSettings
): Promise<ProcessedScriptData> => {
  try {
    // In a real implementation, this would call an API
    // For now, we'll simulate the API call with a delay
    toast.info("Processing your script...");
    
    // In a production environment, we would send the script to an API endpoint
    // const response = await fetch('/api/process-script', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ scriptText, settings }),
    // });
    // const data = await response.json();
    
    // Simulated AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate customized results based on settings
    let scenesResult = [...mockScenes];
    let musicResult = [...mockMusic];
    let voiceoverResult = [...mockVoiceovers];
    
    // Apply tone customization
    if (settings.tone === "casual") {
      scenesResult = scenesResult.map(scene => ({
        ...scene,
        title: scene.title.replace("Introduction", "Friendly Intro")
          .replace("Statement", "Chat")
      }));
      
      voiceoverResult = voiceoverResult.filter(v => 
        v.style === "Conversational" || v.style === "Energetic"
      );
    }
    
    // Apply duration customization
    if (settings.duration === "30 seconds") {
      scenesResult = scenesResult.slice(0, 3);
      scenesResult.forEach(s => s.duration = s.duration.replace("0:", "0:0"));
    } else if (settings.duration === "2 minutes") {
      scenesResult.forEach(s => {
        const parts = s.duration.split(":");
        s.duration = parts[0] + ":" + (parseInt(parts[1]) * 2);
      });
    }
    
    // Apply mood customization
    if (settings.mood === "vibrant") {
      musicResult = musicResult.filter(m => 
        m.category === "Inspirational" || m.category === "Technology"
      );
    } else if (settings.mood === "minimalist") {
      musicResult = musicResult.filter(m => 
        m.category === "Ambient"
      );
    }
    
    // Calculate an estimated duration based on scenes
    const totalSeconds = scenesResult.reduce((total, scene) => {
      const parts = scene.duration.split(":");
      return total + (parseInt(parts[0]) * 60) + parseInt(parts[1]);
    }, 0);
    
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const estimatedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Return processed data
    return {
      scenes: scenesResult,
      musicSuggestions: musicResult,
      voiceoverSuggestions: voiceoverResult,
      estimatedDuration
    };
  } catch (error) {
    console.error("Error processing script:", error);
    toast.error("Failed to process script. Please try again.");
    throw error;
  }
};

// Function to generate a script from a brief description
export const generateScript = async (
  idea: string,
  settings: ScriptProcessingSettings
): Promise<string> => {
  try {
    toast.info("Generating script from your idea...");
    
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate a script based on the settings
    let scriptBase = "";
    
    if (settings.tone === "professional") {
      scriptBase = `# Professional Video Script: ${idea}\n\n`;
      scriptBase += "## Introduction\n";
      scriptBase += `Welcome to this presentation on ${idea}. Today, we'll explore key aspects and benefits.\n\n`;
      scriptBase += "## Main Points\n";
      scriptBase += "1. Industry context and challenges\n";
      scriptBase += "2. Introducing our comprehensive solution\n";
      scriptBase += "3. Key differentiating factors\n";
      scriptBase += "4. Implementation and results\n\n";
      scriptBase += "## Conclusion\n";
      scriptBase += "Thank you for your attention. To learn more, please contact our team.";
    } else if (settings.tone === "casual") {
      scriptBase = `# Casual Video Script: ${idea}\n\n`;
      scriptBase += "## Hey there!\n";
      scriptBase += `So glad you're here! Let's chat about ${idea} - it's pretty exciting stuff!\n\n`;
      scriptBase += "## What we'll cover:\n";
      scriptBase += "1. The problem everyone's facing\n";
      scriptBase += "2. Our awesome solution\n";
      scriptBase += "3. Why people love it\n";
      scriptBase += "4. How you can get started today\n\n";
      scriptBase += "## Wrapping up\n";
      scriptBase += "Thanks for hanging out! Drop a comment below and let's keep the conversation going!";
    } else if (settings.tone === "energetic") {
      scriptBase = `# High-Energy Video Script: ${idea}\n\n`;
      scriptBase += "## ATTENTION!\n";
      scriptBase += `ARE YOU READY TO REVOLUTIONIZE YOUR APPROACH TO ${idea.toUpperCase()}?!\n\n`;
      scriptBase += "## WE'LL DIVE INTO:\n";
      scriptBase += "1. The MASSIVE challenges in the industry\n";
      scriptBase += "2. Our GAME-CHANGING solution\n";
      scriptBase += "3. INCREDIBLE results our clients are seeing\n";
      scriptBase += "4. How YOU can get started RIGHT NOW\n\n";
      scriptBase += "## THE MOMENT IS NOW!\n";
      scriptBase += "DON'T WAIT! Click that button below and TRANSFORM your results TODAY!";
    } else {
      scriptBase = `# Video Script: ${idea}\n\n`;
      scriptBase += "## Introduction\n";
      scriptBase += `This video explores ${idea}.\n\n`;
      scriptBase += "## Key Points\n";
      scriptBase += "1. Background information\n";
      scriptBase += "2. Current challenges\n";
      scriptBase += "3. Proposed solutions\n";
      scriptBase += "4. Expected outcomes\n\n";
      scriptBase += "## Conclusion\n";
      scriptBase += "Thank you for watching.";
    }
    
    return scriptBase;
  } catch (error) {
    console.error("Error generating script:", error);
    toast.error("Failed to generate script. Please try again.");
    throw error;
  }
};
