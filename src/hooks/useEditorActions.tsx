import { useState } from 'react';
import { toast } from "sonner";
import { Crop, Scissors, Wand2 } from "lucide-react";
import { usePromptEnhancement } from '@/hooks/usePromptEnhancement';

interface UseEditorActionsReturn {
  videoTitle: string;
  setVideoTitle: (title: string) => void;
  scriptIdea: string;
  setScriptIdea: (idea: string) => void;
  views: number;
  clicks: number;
  activeTool: string | null;
  setActiveTool: (tool: string | null) => void;
  handleUpload: (file?: File) => void;
  handleRecord: () => void;
  handleTrimVideo: () => void;
  handleCropFrame: () => void;
  handleInsertToken: () => void;
  handleConnectCRM: () => void;
  handleConnectSalesforce: () => void;
  handleExport: () => void;
  handlePublishLanding: () => void;
  handleDownloadAnalytics: () => void;
  handleAIEnhance: () => void;
  handleAutoCaption: () => void;
  handleGreenScreen: () => void;
  handleMagicResize: () => void;
}

export const useEditorActions = (): UseEditorActionsReturn => {
  const [videoTitle, setVideoTitle] = useState("");
  const [scriptIdea, setScriptIdea] = useState("");
  const [views] = useState(128);
  const [clicks] = useState(43);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const { enhancePrompt, isEnhancing } = usePromptEnhancement();
  
  const handleUpload = (file?: File) => {
    if (file) {
      // If a file was passed, we're dealing with an actual upload
      const fileSizeMB = file.size / (1024 * 1024);
      const maxSize = 100; // 100MB max size
      
      if (fileSizeMB > maxSize) {
        toast.error(`File is too large. Maximum size is ${maxSize}MB.`);
        return;
      }
      
      toast.success(`Uploaded video: ${file.name}`);
      
      // In a real implementation, we would:
      // 1. Upload to storage or process the file
      // 2. Create a video clip object
      console.log('Video file selected:', file.name, file.size, 'bytes');
    } else {
      // This is just the button click without a file
      toast.info("Please select a video file");
    }
  };
  
  const handleRecord = () => {
    // Request camera and microphone permissions
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        toast.success("Camera and microphone access granted. Recording would start here.");
        // In a real implementation:
        // 1. Create a MediaRecorder instance
        // 2. Start recording and save the video
        
        // Stop all tracks to release the camera and microphone
        stream.getTracks().forEach(track => track.stop());
      })
      .catch(err => {
        console.error("Error accessing camera/microphone:", err);
        toast.error("Could not access camera or microphone. Please check permissions.");
      });
  };
  
  const handleTrimVideo = () => {
    toast.info("Opening Trim Video tool");
    setActiveTool("trim");
    
    // Show modal for trimming
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
    
    // Add event listeners
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
    
    // Show modal for cropping
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
    
    // Add event listeners
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
  
  const handleInsertToken = () => {
    toast.info("Opening Token Personalization");
    setActiveTool("token");
    
    // Show modal for inserting tokens
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
    
    // Add event listeners
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
        setActiveTool(null);
      });
    }
  };
  
  const handleConnectCRM = () => {
    toast.info("Opening CRM Connection");
    setActiveTool("crm");
    
    // Show modal for CRM connection
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
    
    // Add event listeners
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
    
    // Show modal for Salesforce connection
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
    
    // Add event listeners
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
  
  const handleExport = () => {
    toast.success("Exporting video...");
    
    // Show progress toast
    toast.loading("Processing video export...", {
      id: "export-toast",
      duration: 3000,
    });
    
    // After 3 seconds, show success
    setTimeout(() => {
      toast.success("Export complete! Video downloaded.", {
        id: "export-toast",
      });
      
      // Simulate download
      const link = document.createElement('a');
      link.download = `${videoTitle || 'video'}-export.mp4`;
      link.href = '#';
      link.click();
    }, 3000);
  };
  
  const handlePublishLanding = () => {
    if (!videoTitle.trim()) {
      toast.error("Please enter a video title first");
      return;
    }
    
    toast.loading("Publishing video and generating landing page...", {
      id: "publish-toast",
    });
    
    // Simulate landing page generation
    setTimeout(() => {
      const landingPageUrl = `https://landing.videovibes.app/${encodeURIComponent(videoTitle.toLowerCase().replace(/\s+/g, '-'))}-${Date.now().toString().slice(-6)}`;
      
      toast.success(`Landing page published!`, {
        id: "publish-toast",
        description: "Your video landing page is now live.",
        action: {
          label: "Copy Link",
          onClick: () => {
            navigator.clipboard.writeText(landingPageUrl);
            toast.success("Link copied to clipboard!");
          },
        },
      });
      
      // Open a modal with the landing page details
      const modal = document.createElement('div');
      modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
      modal.innerHTML = `
        <div class="bg-white p-6 rounded-xl max-w-xl w-full">
          <h2 class="text-2xl font-bold mb-4">Landing Page Published!</h2>
          <p class="mb-4">Your video has been successfully published to a landing page.</p>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Landing Page URL</label>
              <div class="flex">
                <input type="text" class="w-full border rounded-l px-3 py-2" readonly value="${landingPageUrl}" />
                <button id="copy-url" class="bg-blue-50 border border-blue-200 text-blue-700 px-3 rounded-r">Copy</button>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">QR Code</label>
              <div class="border rounded p-4 bg-gray-50 flex items-center justify-center">
                <div class="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs text-gray-500">QR Code Placeholder</div>
              </div>
            </div>
            
            <div class="bg-green-50 p-3 rounded text-sm">
              <h4 class="font-medium text-green-700">Analytics Tracking</h4>
              <p class="text-green-600 mt-1">Your landing page is set up to track views, clicks, and watch time.</p>
            </div>
          </div>
          
          <div class="flex justify-between gap-2 mt-6">
            <a id="preview-page" href="${landingPageUrl}" target="_blank" class="px-4 py-2 border border-gray-300 rounded text-center">Preview Page</a>
            <button id="close-landing" class="px-4 py-2 bg-purple-600 text-white rounded">Close</button>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Add event listeners
      const closeBtn = modal.querySelector('#close-landing');
      const copyBtn = modal.querySelector('#copy-url');
      
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          document.body.removeChild(modal);
        });
      }
      
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(landingPageUrl);
          toast.success("Link copied to clipboard!");
        });
      }
    }, 2000);
  };
  
  const handleDownloadAnalytics = () => {
    toast.success("Downloading analytics report...");
    
    // Create and trigger a CSV download
    const csvContent = `Video Title,Views,Clicks,CTR,Watch Time\n${videoTitle || "Untitled"},${views},${clicks},${(clicks/views*100).toFixed(1)}%,02:45`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'video-analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        toast.error("Failed to enhance script. Please try again.", { id: "ai-enhance" });
      }
    } catch (error) {
      console.error('Error enhancing script:', error);
      toast.error("Failed to enhance script. Please try again.", { id: "ai-enhance" });
    }
  };
  
  const handleAutoCaption = () => {
    toast.loading("Generating captions...", { id: "auto-caption" });
    setActiveTool("captions");
    
    // Show the auto captions panel in a modal
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
    
    // Add event listeners
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
  
  // Fix the Green Screen function that had the unterminated string literal
  const handleGreenScreen = () => {
    toast.info("Opening Green Screen tool");
    setActiveTool("greenscreen");
    
    // Show modal for green screen
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
            <label class="block text-sm font-medium
