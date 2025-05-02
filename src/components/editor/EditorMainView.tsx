
import React from 'react';
import VideoToolbar from '../VideoToolbar';
import { Button } from '../ui/button';
import { Wand2, FileText, Video, ArrowRight, Music, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface EditorMainViewProps {
  scriptIdea: string;
  setScriptIdea: (value: string) => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  views: number;
  clicks: number;
  selectedClipId: string | null;
  handleUpload: (file: File) => void;
  handleRecord: () => void;
  handlePlay: () => void;
  handleSliderChange: (value: number[]) => void;
  handleSplitClip: () => void;
  handleExport: () => void;
  handleDownloadAnalytics: () => void;
}

const EditorMainView: React.FC<EditorMainViewProps> = ({
  scriptIdea,
  setScriptIdea,
  selectedClipId,
  handleSplitClip,
  handleExport,
}) => {
  // Function to generate storyboard
  const handleGenerateStoryboard = () => {
    toast('Generating storyboard...', {
      description: 'Creating visual layout for your scenes',
      duration: 3000,
    });
    
    setTimeout(() => {
      toast.success('Storyboard generated!', {
        description: 'Successfully created visual representation of your script'
      });
    }, 3000);
  };
  
  // Function to view all suggestions
  const handleViewAllSuggestions = () => {
    toast('Showing all AI-generated suggestions', {
      description: 'Opening detailed suggestions panel',
      duration: 3000,
    });
  };
  
  return (
    <>
      {/* Video Toolbar */}
      <VideoToolbar 
        onSplit={handleSplitClip}
        onExport={handleExport}
        hasSelectedClip={!!selectedClipId}
      />
      
      {/* Script to Video Workspace Section */}
      {scriptIdea && (
        <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-blue-500" />
            Script-to-Video Suggestions
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SuggestionCard 
                title="Scene Breakdown" 
                description="Based on your script, we recommend 4 main scenes with transitions." 
                icon={<Video className="h-5 w-5 text-purple-500" />}
                onClick={() => {
                  toast.info('Opening scene breakdown editor', {
                    description: 'You can edit individual scenes in the AI Workspace tab'
                  });
                }}
              />
              
              <SuggestionCard 
                title="Stock Footage" 
                description="We found 12 relevant stock clips matching your script topic." 
                icon={<Video className="h-5 w-5 text-blue-500" />}
                onClick={() => {
                  toast.success('Generating stock footage suggestions', {
                    description: 'Finding relevant footage for your video'
                  });
                }}
              />
              
              <SuggestionCard 
                title="Music Recommendations" 
                description="Upbeat corporate tracks would match your script's tone." 
                icon={<Music className="h-5 w-5 text-green-500" />}
                onClick={() => {
                  toast.success('Finding matching music tracks', {
                    description: 'Analyzing your script to find matching audio'
                  });
                }}
              />
            </div>
            
            <div className="mt-5">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                onClick={handleGenerateStoryboard}
              >
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Storyboard
              </Button>
              <Button 
                variant="outline" 
                className="ml-2 border-blue-300 text-blue-700"
                onClick={handleViewAllSuggestions}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                View All Suggestions
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Workflow Guidance */}
      <div className="p-5 border border-blue-200 bg-blue-50 rounded-xl mb-6">
        <h3 className="font-semibold text-blue-800 mb-3">Quick Start Video Workflow</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">1</div>
            <span className="text-blue-900">Create Script</span>
          </div>
          <ArrowRight className="w-3 h-3 text-blue-400" />
          <div className="flex items-center">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">2</div>
            <span className="text-blue-900">Upload Media</span>
          </div>
          <ArrowRight className="w-3 h-3 text-blue-400" />
          <div className="flex items-center">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">3</div>
            <span className="text-blue-900">Edit & Enhance</span>
          </div>
          <ArrowRight className="w-3 h-3 text-blue-400" />
          <div className="flex items-center">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">4</div>
            <span className="text-blue-900">Export & Share</span>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper component for suggestion cards with click functionality
const SuggestionCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}> = ({ title, description, icon, onClick }) => {
  return (
    <div 
      className="p-4 bg-blue-50 border border-blue-100 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors duration-200"
      onClick={onClick}
    >
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="font-medium text-blue-800 ml-2">{title}</h4>
      </div>
      <p className="text-sm text-blue-700">{description}</p>
    </div>
  );
};

export default EditorMainView;
