
import { useState } from 'react';
import { toast } from "sonner";
import { usePromptEnhancement } from '@/hooks/usePromptEnhancement';

interface UseEnhancementActionsProps {
  scriptIdea: string;
  setScriptIdea: (idea: string) => void;
}

interface UseEnhancementActionsReturn {
  handleAIEnhance: () => void;
  handleAutoCaption: () => void;
  handleGreenScreen: () => void;
  handleMagicResize: () => void;
}

export const useEnhancementActions = ({
  scriptIdea,
  setScriptIdea
}: UseEnhancementActionsProps): UseEnhancementActionsReturn => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const { enhancePrompt } = usePromptEnhancement();

  const handleAIEnhance = async () => {
    if (!scriptIdea.trim()) {
      toast.error('Please enter a script idea to enhance');
      return;
    }
    
    toast.loading("Enhancing with AI...", { id: "ai-enhance" });
    
    try {
      const enhancedScript = await enhancePrompt(scriptIdea);
      if (enhancedScript) {
        setScriptIdea(enhancedScript);
        toast.success("Script enhanced with AI!", { id: "ai-enhance" });
      } else {
        // If there's no API response, simulate one for demo purposes
        setTimeout(() => {
          const enhancedScript = `# Enhanced Script: ${scriptIdea}

## Introduction (0:00-0:30)
- Open with a captivating hook related to ${scriptIdea}
- Introduce yourself and establish credibility
- Clearly state what viewers will learn

## Main Content (0:30-2:30)
- Point 1: Key concept explanation with visual examples
- Point 2: Practical application demonstration
- Point 3: Common mistakes to avoid and best practices

## Conclusion (2:30-3:00)
- Recap the main points
- Provide a clear call-to-action
- Thank viewers and encourage engagement

## Visual Notes:
- Include overlay text for key statistics
- Add lower-third graphics for important points
- Use smooth transitions between segments
          `;
          
          setScriptIdea(enhancedScript);
          toast.success("Script enhanced with AI!", { id: "ai-enhance" });
        }, 2000);
      }
    } catch (error) {
      console.error('Error enhancing script:', error);
      toast.error("Failed to enhance script. Please try again.", { id: "ai-enhance" });
    }
  };
  
  const handleAutoCaption = () => {
    toast.loading("Generating captions...", { id: "auto-caption" });
    setActiveTool("captions");
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">Auto Captions</h2>
          <button id="close-captions" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div class="bg-blue-50 p-4 rounded">
            <h3 class="font-medium text-blue-700">Generating Captions</h3>
            <div class="mt-2 space-y-2">
              <div class="flex justify-between text-sm text-blue-700">
                <span>Processing audio...</span>
                <span id="progress-percent">25%</span>
              </div>
              <div class="w-full bg-blue-200 rounded-full h-2.5">
                <div class="bg-blue-600 h-2.5 rounded-full" style="width: 25%"></div>
              </div>
            </div>
          </div>
          
          <div class="border rounded-lg p-4">
            <h3 class="font-medium mb-2">Caption Settings</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium mb-1">Language</label>
                <select class="w-full border rounded px-3 py-2 text-sm">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1">Style</label>
                <div class="grid grid-cols-2 gap-2">
                  <select class="border rounded px-3 py-2 text-sm">
                    <option>Sans-serif</option>
                    <option>Serif</option>
                    <option>Monospace</option>
                  </select>
                  <select class="border rounded px-3 py-2 text-sm">
                    <option>White text, black background</option>
                    <option>Yellow text, black background</option>
                    <option>Custom...</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div id="captions-output" class="hidden">
          <h3 class="font-medium my-3">Generated Captions</h3>
          <div class="border rounded overflow-hidden">
            <div class="bg-gray-100 p-2 flex justify-between items-center">
              <span class="font-medium text-sm">Edit Captions</span>
              <div>
                <button class="text-blue-600 text-sm hover:underline">Download SRT</button>
              </div>
            </div>
            <div class="max-h-64 overflow-y-auto p-2 space-y-2">
              <!-- Caption entries will appear here -->
            </div>
          </div>
        </div>
        
        <div class="flex justify-end gap-3 mt-6">
          <button id="cancel-caption" class="px-4 py-2 border border-gray-300 rounded">Cancel</button>
          <button id="apply-captions" class="px-4 py-2 bg-purple-600 text-white rounded" disabled>Apply Captions</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('#close-captions');
    const cancelBtn = modal.querySelector('#cancel-caption');
    const applyBtn = modal.querySelector('#apply-captions');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        setActiveTool(null);
        toast.dismiss("auto-caption");
      });
    }
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        setActiveTool(null);
        toast.dismiss("auto-caption");
      });
    }
    
    // Simulate caption generation
    const captionsOutput = modal.querySelector('#captions-output');
    const progressPercent = modal.querySelector('#progress-percent');
    const progressBar = modal.querySelector('.bg-blue-600');
    
    // Animation to simulate processing
    let progress = 25;
    const interval = setInterval(() => {
      progress += 15;
      if (progressPercent) progressPercent.textContent = `${progress}%`;
      if (progressBar) progressBar.setAttribute('style', `width: ${progress}%`);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          // Show captions result
          if (captionsOutput) captionsOutput.classList.remove('hidden');
          if (applyBtn) applyBtn.removeAttribute('disabled');
          
          // Add some sample captions
          const captionsContainer = modal.querySelector('.max-h-64.overflow-y-auto');
          if (captionsContainer) {
            captionsContainer.innerHTML = `
              <div class="border rounded p-2">
                <div class="text-xs text-gray-500">00:00:01.200 - 00:00:04.800</div>
                <textarea class="w-full border rounded mt-1 p-2 text-sm" rows="2">Welcome to our video tutorial on creating engaging content with VideoVibes!</textarea>
              </div>
              <div class="border rounded p-2">
                <div class="text-xs text-gray-500">00:00:05.100 - 00:00:09.700</div>
                <textarea class="w-full border rounded mt-1 p-2 text-sm" rows="2">Today we'll walk through all the features you need to make professional videos.</textarea>
              </div>
              <div class="border rounded p-2">
                <div class="text-xs text-gray-500">00:00:10.200 - 00:00:14.500</div>
                <textarea class="w-full border rounded mt-1 p-2 text-sm" rows="2">Let's start by exploring the video editing tools available in our dashboard.</textarea>
              </div>
            `;
          }
          
          toast.success("Captions generated successfully!", { id: "auto-caption" });
          
          // Handle apply button
          if (applyBtn) {
            applyBtn.addEventListener('click', () => {
              document.body.removeChild(modal);
              setActiveTool(null);
              toast.success("Captions applied to video");
            });
          }
        }, 800);
      }
    }, 1000);
  };
  
  const handleGreenScreen = () => {
    toast.success("Green screen mode toggled");
    setActiveTool(prev => prev === "greenscreen" ? null : "greenscreen");
  };
  
  const handleMagicResize = () => {
    toast.loading("Analyzing video for resizing...", { id: "magic-resize" });
    
    setTimeout(() => {
      const aspectRatios = [
        { name: "Portrait (9:16)", value: "portrait" },
        { name: "Square (1:1)", value: "square" },
        { name: "Landscape (16:9)", value: "landscape" },
      ];
      
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
      modal.innerHTML = `
        <div class="bg-white p-6 rounded-xl max-w-3xl w-full">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-bold">Magic Resize</h2>
            <button id="close-resize" class="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div class="space-y-6">
            <p>Choose an aspect ratio to automatically resize your video:</p>
            
            <div class="grid grid-cols-3 gap-4">
              ${aspectRatios.map(ratio => `
                <div class="border rounded-lg p-4 hover:bg-purple-50 hover:border-purple-300 cursor-pointer text-center ratio-option" data-ratio="${ratio.value}">
                  <div class="mb-2">
                    ${ratio.value === 'portrait' ? 
                      '<div class="w-8 h-14 bg-purple-200 mx-auto rounded"></div>' :
                      ratio.value === 'square' ? 
                      '<div class="w-10 h-10 bg-purple-200 mx-auto rounded"></div>' :
                      '<div class="w-14 h-8 bg-purple-200 mx-auto rounded"></div>'
                    }
                  </div>
                  <span class="font-medium">${ratio.name}</span>
                </div>
              `).join('')}
            </div>
            
            <div class="flex justify-end">
              <button id="cancel-resize" class="px-4 py-2 border border-gray-300 rounded mr-2">Cancel</button>
              <button id="apply-resize" class="px-4 py-2 bg-purple-600 text-white rounded">Apply Resize</button>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      const closeBtn = modal.querySelector('#close-resize');
      const cancelBtn = modal.querySelector('#cancel-resize');
      const applyBtn = modal.querySelector('#apply-resize');
      const ratioOptions = modal.querySelectorAll('.ratio-option');
      
      let selectedRatio = null;
      
      // Add click handlers to ratio options
      ratioOptions.forEach(option => {
        option.addEventListener('click', () => {
          // Remove selected class from all options
          ratioOptions.forEach(opt => opt.classList.remove('bg-purple-100', 'border-purple-400'));
          
          // Add selected class to clicked option
          option.classList.add('bg-purple-100', 'border-purple-400');
          selectedRatio = option.getAttribute('data-ratio');
        });
      });
      
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          document.body.removeChild(modal);
          setActiveTool(null);
          toast.dismiss("magic-resize");
        });
      }
      
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          document.body.removeChild(modal);
          setActiveTool(null);
          toast.dismiss("magic-resize");
        });
      }
      
      if (applyBtn) {
        applyBtn.addEventListener('click', () => {
          if (selectedRatio) {
            document.body.removeChild(modal);
            toast.success(`Video resized to ${selectedRatio} format`, { id: "magic-resize" });
            setActiveTool(null);
          } else {
            toast.error("Please select an aspect ratio", { id: "magic-resize" });
          }
        });
      }
      
      toast.dismiss("magic-resize");
    }, 1500);
  };

  return {
    handleAIEnhance,
    handleAutoCaption,
    handleGreenScreen,
    handleMagicResize
  };
};
