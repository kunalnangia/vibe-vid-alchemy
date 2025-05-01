import { useState } from 'react';
import { toast } from "sonner";

interface UsePersonalizationActionsReturn {
  handleInsertToken: () => void;
  handleConnectCRM: () => void;
  handleConnectSalesforce: () => void;
  handlePublishLanding: () => void;
}

export const usePersonalizationActions = (): UsePersonalizationActionsReturn => {
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
  
  const handleConnectCRM = () => {
    toast.info("Opening CRM Connection");
    setActiveTool("crm");
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-xl max-w-xl w-full">
        <h2 class="text-2xl font-bold mb-4">Connect CRM</h2>
        <p class="mb-4">Connect your CRM to personalize videos for your contacts.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Select CRM</label>
            <select class="w-full border rounded px-3 py-2">
              <option>HubSpot</option>
              <option>Zoho</option>
              <option>Pipedrive</option>
              <option>Monday.com</option>
              <option>Other</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">API Key</label>
            <input type="text" class="w-full border rounded px-3 py-2" placeholder="Enter your CRM API key" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Webhook URL (Optional)</label>
            <input type="text" class="w-full border rounded px-3 py-2" placeholder="https://your-crm-webhook.com" />
          </div>
          
          <div class="bg-blue-50 p-3 rounded text-sm">
            <h4 class="font-medium text-blue-700">Available Data Fields</h4>
            <ul class="list-disc pl-5 mt-1 text-blue-600">
              <li>Contact Name</li>
              <li>Company Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Custom Fields</li>
            </ul>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-6">
          <button id="cancel-crm" class="px-4 py-2 border border-gray-300 rounded">Cancel</button>
          <button id="connect-crm" class="px-4 py-2 bg-purple-600 text-white rounded">Connect CRM</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const cancelBtn = modal.querySelector('#cancel-crm');
    const connectBtn = modal.querySelector('#connect-crm');
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        setActiveTool(null);
      });
    }
    
    if (connectBtn) {
      connectBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        toast.success("CRM connected successfully");
        setActiveTool(null);
      });
    }
  };
  
  const handleConnectSalesforce = () => {
    toast.info("Opening Salesforce Connection");
    setActiveTool("salesforce");
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white p-6 rounded-xl max-w-xl w-full">
        <h2 class="text-2xl font-bold mb-4">Connect Salesforce</h2>
        <p class="mb-4">Connect your Salesforce account to personalize videos for your contacts.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Salesforce Instance</label>
            <input type="text" class="w-full border rounded px-3 py-2" placeholder="https://yourcompany.salesforce.com" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Consumer Key</label>
            <input type="text" class="w-full border rounded px-3 py-2" placeholder="Enter your Salesforce consumer key" />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Consumer Secret</label>
            <input type="password" class="w-full border rounded px-3 py-2" placeholder="Enter your Salesforce consumer secret" />
          </div>
          
          <div class="bg-blue-50 p-3 rounded text-sm">
            <h4 class="font-medium text-blue-700">Available Data Objects</h4>
            <ul class="list-disc pl-5 mt-1 text-blue-600">
              <li>Contacts</li>
              <li>Leads</li>
              <li>Opportunities</li>
              <li>Accounts</li>
              <li>Custom Objects</li>
            </ul>
          </div>
        </div>
        
        <div class="flex justify-end gap-2 mt-6">
          <button id="cancel-sf" class="px-4 py-2 border border-gray-300 rounded">Cancel</button>
          <button id="connect-sf" class="px-4 py-2 bg-purple-600 text-white rounded">Connect Salesforce</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const cancelBtn = modal.querySelector('#cancel-sf');
    const connectBtn = modal.querySelector('#connect-sf');
    
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        setActiveTool(null);
      });
    }
    
    if (connectBtn) {
      connectBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
        toast.success("Salesforce connected successfully");
        setActiveTool(null);
      });
    }
  };
  
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
    handleInsertToken,
    handleConnectCRM,
    handleConnectSalesforce,
    handlePublishLanding
  };
};
