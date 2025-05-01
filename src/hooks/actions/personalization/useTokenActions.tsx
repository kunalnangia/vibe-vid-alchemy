
import { useState } from 'react';
import { toast } from "sonner";

interface UseTokenActionsReturn {
  handleInsertToken: () => void;
}

export const useTokenActions = (): UseTokenActionsReturn => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handleInsertToken = () => {
    toast.info("Opening Token Personalization");
    setActiveTool("token");
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-xl max-w-xl w-full">
        <h2 class="text-2xl font-bold mb-4">Insert Personalization Token</h2>
        <p class="mb-4">Add dynamic content that changes for each viewer.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Token Type</label>
            <select class="w-full border rounded px-3 py-2">
              <option>Viewer Name</option>
              <option>Company Name</option>
              <option>Custom Field</option>
              <option>Current Date</option>
              <option>Location</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Default Value</label>
            <input type="text" class="w-full border rounded px-3 py-2" placeholder="What to show if data is missing" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Position</label>
            <div class="grid grid-cols-2 gap-2">
              <input type="number" class="border rounded px-3 py-2" placeholder="X position" />
              <input type="number" class="border rounded px-3 py-2" placeholder="Y position" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Preview</label>
            <div class="border rounded p-3 bg-gray-50 text-center">
              Hello, <span class="bg-blue-100 px-2 py-1 rounded text-blue-700 font-medium">{Viewer Name}</span>!
            </div>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-6">
          <button id="cancel-token" class="px-4 py-2 border border-gray-300 rounded">Cancel</button>
          <button id="insert-token" class="px-4 py-2 bg-purple-600 text-white rounded">Insert Token</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const cancelBtn = modal.querySelector('#cancel-token');
    const insertBtn = modal.querySelector('#insert-token');
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        setActiveTool(null);
      });
    }
    
    if (insertBtn) {
      insertBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        toast.success("Token inserted successfully");
        setActiveTool(null);
      });
    }
  };
  
  return {
    handleInsertToken
  };
};
