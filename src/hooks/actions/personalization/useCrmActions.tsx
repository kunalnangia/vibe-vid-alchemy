
import { useState } from 'react';
import { toast } from "sonner";

interface UseCrmActionsReturn {
  handleConnectCRM: () => void;
  handleConnectSalesforce: () => void;
}

export const useCrmActions = (): UseCrmActionsReturn => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

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
  
  return {
    handleConnectCRM,
    handleConnectSalesforce
  };
};

export default useCrmActions;
