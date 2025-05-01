
import { useState } from 'react';
import { toast } from "sonner";

interface UseLandingPageActionsReturn {
  handlePublishLanding: () => void;
}

export const useLandingPageActions = (): UseLandingPageActionsReturn => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handlePublishLanding = () => {
    toast.info("Preparing landing page...");
    setActiveTool("landing");
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-xl max-w-xl w-full">
        <h2 class="text-2xl font-bold mb-4">Publish Landing Page</h2>
        <p class="mb-4">Create a landing page to share your video and collect analytics.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Landing Page URL</label>
            <div class="flex">
              <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                https://
              </span>
              <input type="text" class="flex-1 rounded-none rounded-r-md border border-gray-300 px-3 py-2" placeholder="your-video-page.com" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Page Template</label>
            <select class="w-full border rounded px-3 py-2">
              <option>Simple Video Page</option>
              <option>Video with Call to Action</option>
              <option>Lead Generation</option>
              <option>Product Demo</option>
              <option>Custom Layout</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Call-to-Action</label>
            <div class="grid grid-cols-2 gap-2">
              <input type="text" class="border rounded px-3 py-2" placeholder="Button Text" value="Learn More" />
              <input type="text" class="border rounded px-3 py-2" placeholder="Button URL" />
            </div>
          </div>
          
          <div class="bg-blue-50 p-3 rounded text-sm">
            <h4 class="font-medium text-blue-700">Analytics Collection</h4>
            <p class="text-blue-600 mt-1">Your landing page will track views, engagement, and call-to-action clicks.</p>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-6">
          <button id="cancel-landing" class="px-4 py-2 border border-gray-300 rounded">Cancel</button>
          <button id="publish-landing" class="px-4 py-2 bg-purple-600 text-white rounded">Publish Landing Page</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const cancelBtn = modal.querySelector('#cancel-landing');
    const publishBtn = modal.querySelector('#publish-landing');
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        setActiveTool(null);
      });
    }
    
    if (publishBtn) {
      publishBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        toast.success("Landing page published successfully");
        setActiveTool(null);
      });
    }
  };
  
  return {
    handlePublishLanding
  };
};
