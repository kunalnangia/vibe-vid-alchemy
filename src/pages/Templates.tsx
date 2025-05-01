
import React from 'react';
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Templates = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-purple-800">Video Templates</h1>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templateData.map((template) => (
              <div 
                key={template.id} 
                className="rounded-lg overflow-hidden border border-purple-200 bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-purple-100 flex items-center justify-center">
                  <span className="text-3xl text-purple-400">{template.emoji}</span>
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-lg text-purple-700">{template.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                      {template.duration}
                    </span>
                    <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm rounded">
                      Use Template
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

// Template data
const templateData = [
  {
    id: 1,
    title: "Product Showcase",
    description: "Highlight your product features with smooth transitions and engaging overlays.",
    duration: "30 seconds",
    emoji: "📱"
  },
  {
    id: 2,
    title: "Social Media Story",
    description: "Vertical format optimized for Instagram and TikTok with trending effects.",
    duration: "15 seconds",
    emoji: "📲"
  },
  {
    id: 3,
    title: "Corporate Presentation",
    description: "Professional template with logo placement and brand colors.",
    duration: "2 minutes",
    emoji: "💼"
  },
  {
    id: 4,
    title: "Tutorial Video",
    description: "Step-by-step guide format with caption placeholders and chapter markers.",
    duration: "5 minutes",
    emoji: "🎓"
  },
  {
    id: 5,
    title: "Promotional Ad",
    description: "Attention-grabbing intro with call-to-action animation.",
    duration: "30 seconds",
    emoji: "🔊"
  },
  {
    id: 6,
    title: "Event Invitation",
    description: "Animated text reveals with date/time highlights and location map.",
    duration: "20 seconds",
    emoji: "📅"
  }
];

export default Templates;
