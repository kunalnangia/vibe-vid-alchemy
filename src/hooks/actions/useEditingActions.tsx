
import { useState } from 'react';
import { toast } from "sonner";

interface UseEditingActionsReturn {
  handleTrimVideo: () => void;
  handleCropFrame: () => void;
  handleGreenScreen: () => void;
  handleMagicResize: () => void;
  handleSplitClip?: () => void;
}

export const useEditingActions = (): UseEditingActionsReturn => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handleTrimVideo = () => {
    toast.info("Opening Trim Video tool");
    setActiveTool("trim");
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-xl max-w-xl w-full">
        <h2 class="text-2xl font-bold mb-4">Trim Video</h2>
        <p>Drag the handles to set the start and end points of your clip.</p>
        <div class="my-4 h-16 bg-gray-200 rounded relative">
          <div class="absolute h-full w-3/4 bg-purple-400 left-[12.5%]"></div>
          <div class="absolute h-full w-2 bg-purple-800 left-[12.5%] cursor-ew-resize"></div>
          <div class="absolute h-full w-2 bg-purple-800 left-[87.5%] cursor-ew-resize"></div>
        </div>
        <div class="flex justify-between">
          <span>00:00</span>
          <span>00:30</span>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <button id="cancel-trim" class="px-4 py-2 border border-gray-300 rounded">Cancel</button>
          <button id="apply-trim" class="px-4 py-2 bg-purple-600 text-white rounded">Apply Trim</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const cancelBtn = modal.querySelector('#cancel-trim');
    const applyBtn = modal.querySelector('#apply-trim');
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
    }
    
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        toast.success("Video trimmed successfully");
        setActiveTool(null);
      });
    }
  };
  
  const handleCropFrame = () => {
    toast.info("Opening Crop Frame tool");
    setActiveTool("crop");
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-xl max-w-xl w-full">
        <h2 class="text-2xl font-bold mb-4">Crop Video</h2>
        <p>Adjust the crop area to focus on the important parts of your video.</p>
        <div class="my-4 aspect-video bg-gray-800 rounded relative">
          <div class="absolute border-2 border-purple-500 inset-[15%] cursor-move">
            <div class="absolute w-3 h-3 bg-white border border-purple-800 -top-1.5 -left-1.5 cursor-nwse-resize"></div>
            <div class="absolute w-3 h-3 bg-white border border-purple-800 -top-1.5 -right-1.5 cursor-nesw-resize"></div>
            <div class="absolute w-3 h-3 bg-white border border-purple-800 -bottom-1.5 -left-1.5 cursor-nesw-resize"></div>
            <div class="absolute w-3 h-3 bg-white border border-purple-800 -bottom-1.5 -right-1.5 cursor-nwse-resize"></div>
          </div>
        </div>
        <div class="flex justify-between mt-2">
          <div>
            <label class="text-xs text-gray-500">Aspect Ratio</label>
            <select class="border rounded px-2 py-1 text-sm">
              <option>16:9</option>
              <option>4:3</option>
              <option>1:1</option>
              <option>9:16</option>
            </select>
          </div>
          <div class="flex gap-2">
            <button id="cancel-crop" class="px-4 py-2 border border-gray-300 rounded">Cancel</button>
            <button id="apply-crop" class="px-4 py-2 bg-purple-600 text-white rounded">Apply Crop</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const cancelBtn = modal.querySelector('#cancel-crop');
    const applyBtn = modal.querySelector('#apply-crop');
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
    }
    
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        toast.success("Video cropped successfully");
        setActiveTool(null);
      });
    }
  };
  
  const handleGreenScreen = () => {
    toast.info("Opening Green Screen tool");
    setActiveTool("greenscreen");
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-xl max-w-xl w-full">
        <h2 class="text-2xl font-bold mb-4">Green Screen / Chroma Key</h2>
        <p class="mb-4">Remove or replace the background of your video.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Background Color</label>
            <div class="grid grid-cols-6 gap-2">
              <div class="h-10 w-10 rounded-full bg-green-500 cursor-pointer border-2 border-blue-500"></div>
              <div class="h-10 w-10 rounded-full bg-blue-500 cursor-pointer"></div>
              <div class="h-10 w-10 rounded-full bg-red-500 cursor-pointer"></div>
              <div class="h-10 w-10 rounded-full bg-purple-500 cursor-pointer"></div>
              <div class="h-10 w-10 rounded-full bg-black cursor-pointer"></div>
              <div class="h-10 w-10 rounded-full bg-white border border-gray-300 cursor-pointer"></div>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Background Removal Sensitivity</label>
            <input type="range" min="1" max="100" value="50" class="w-full" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Edge Smoothness</label>
            <input type="range" min="0" max="10" value="3" class="w-full" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Background Type</label>
            <div class="grid grid-cols-2 gap-2">
              <button class="border rounded py-2 px-3 bg-blue-50 text-blue-700 font-medium">Transparent</button>
              <button class="border rounded py-2 px-3">Custom Image</button>
            </div>
          </div>
          
          <div class="bg-blue-50 p-3 rounded text-sm">
            <h4 class="font-medium text-blue-700">Pro Tip</h4>
            <p class="text-blue-600 mt-1">For best results, record with even lighting and a solid color background.</p>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-6">
          <button id="cancel-green" class="px-4 py-2 border border-gray-300 rounded">Cancel</button>
          <button id="apply-green" class="px-4 py-2 bg-purple-600 text-white rounded">Apply Changes</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const cancelBtn = modal.querySelector('#cancel-green');
    const applyBtn = modal.querySelector('#apply-green');
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        setActiveTool(null);
      });
    }
    
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        toast.success("Green screen effect applied");
        setActiveTool(null);
      });
    }
  };

  const handleMagicResize = () => {
    toast.info("Opening Magic Resize tool");
    setActiveTool("resize");
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-xl max-w-xl w-full">
        <h2 class="text-2xl font-bold mb-4">Magic Resize</h2>
        <p class="mb-4">Automatically resize your video for different platforms.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Target Format</label>
            <div class="grid grid-cols-3 gap-2">
              <button class="border-2 border-purple-500 rounded p-3 flex flex-col items-center">
                <div class="w-16 h-9 bg-gray-200 rounded mb-2"></div>
                <span class="text-xs font-medium">Landscape 16:9</span>
              </button>
              <button class="border rounded p-3 flex flex-col items-center">
                <div class="w-9 h-16 bg-gray-200 rounded mb-2"></div>
                <span class="text-xs font-medium">Portrait 9:16</span>
              </button>
              <button class="border rounded p-3 flex flex-col items-center">
                <div class="w-12 h-12 bg-gray-200 rounded mb-2"></div>
                <span class="text-xs font-medium">Square 1:1</span>
              </button>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">AI Subject Tracking</label>
            <div class="flex items-center">
              <input type="checkbox" id="subject-tracking" class="mr-2" checked />
              <label for="subject-tracking">Keep main subject in frame</label>
            </div>
            <p class="text-xs text-gray-500 mt-1">AI will analyze your video to keep important elements in frame</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Batch Export</label>
            <div class="border rounded p-3 bg-gray-50">
              <div class="flex items-center">
                <input type="checkbox" id="batch-landscape" class="mr-2" checked />
                <label for="batch-landscape">Landscape (YouTube, Website)</label>
              </div>
              <div class="flex items-center mt-2">
                <input type="checkbox" id="batch-portrait" class="mr-2" checked />
                <label for="batch-portrait">Portrait (TikTok, Instagram)</label>
              </div>
              <div class="flex items-center mt-2">
                <input type="checkbox" id="batch-square" class="mr-2" />
                <label for="batch-square">Square (Instagram, Facebook)</label>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-6">
          <button id="cancel-resize" class="px-4 py-2 border border-gray-300 rounded">Cancel</button>
          <button id="apply-resize" class="px-4 py-2 bg-purple-600 text-white rounded">Apply Resize</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const cancelBtn = modal.querySelector('#cancel-resize');
    const applyBtn = modal.querySelector('#apply-resize');
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        setActiveTool(null);
      });
    }
    
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        toast.success("Video resized successfully");
        setActiveTool(null);
      });
    }
  };
  
  return {
    handleTrimVideo,
    handleCropFrame,
    handleGreenScreen,
    handleMagicResize
  };
};
