import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import VideoTimeline from './VideoTimeline';
import VideoToolbar from './VideoToolbar';
import TextOverlayEditor from './TextOverlayEditor';
import MediaLibraryPanel from "./MediaLibraryPanel";
import TemplatesPanel from "./TemplatesPanel";
import VideoFilters from './VideoFilters';
import TemplateLibrary from './TemplateLibrary';
import AspectRatioSelector from './AspectRatioSelector';
import { 
  Play, Pause, SkipBack, SkipForward, Download, Upload, Scissors,
  Music, Captions, Store, Share, Users, Filter, ArrowUpDown, Video, LayoutGrid
} from 'lucide-react';

// Define types for our video project
interface VideoClip {
  id: string;
  src: string;
  start: number;
  end: number;
  position: number;
  duration: number;
}

interface TextOverlay {
  id: string;
  text: string;
  position: { x: number, y: number };
  style: {
    color: string;
    fontSize: string;
    fontFamily: string;
  };
  startTime: number;
  endTime: number;
}

interface VideoProject {
  clips: VideoClip[];
  textOverlays: TextOverlay[];
  duration: number;
  aspectRatio: string;
  currentFilter: string;
}

import SidebarPanels from './SidebarPanels';
import VideoPreview from './VideoPreview';
import VideoControls from './VideoControls';

const VideoEditor: React.FC = () => {
  const [project, setProject] = useState<VideoProject>({
    clips: [],
    textOverlays: [],
    duration: 0,
    aspectRatio: 'landscape', // Default to 16:9
    currentFilter: 'normal', // Default to no filter
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAspectRatio, setShowAspectRatio] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if it's a video file
    if (!file.type.startsWith('video/')) {
      toast.error("Please select a valid video file");
      return;
    }
    
    const url = URL.createObjectURL(file);
    
    // Create a temp video element to get the duration
    const video = document.createElement('video');
    video.onloadedmetadata = () => {
      const newClip: VideoClip = {
        id: `clip-${Date.now()}`,
        src: url,
        start: 0,
        end: video.duration,
        position: 0, // Position in the timeline
        duration: video.duration,
      };
      
      setProject(prev => ({
        ...prev,
        clips: [...prev.clips, newClip],
        duration: Math.max(prev.duration, newClip.duration),
      }));
      
      toast.success("Video added to timeline");
      
      // If this is the first clip, set it as selected
      if (project.clips.length === 0) {
        setSelectedClipId(newClip.id);
      }
    };
    
    video.onerror = () => {
      toast.error("Error loading video file");
      URL.revokeObjectURL(url);
    };
    
    video.src = url;
  };

  // Play/pause control
  const togglePlay = () => {
    if (!project.clips.length) {
      toast.error("No video to play");
      return;
    }
    
    setIsPlaying(!isPlaying);
  };

  // Seek to a specific time
  const seekTo = (time: number) => {
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  // Split clip at current position
  const splitClip = () => {
    if (!selectedClipId) {
      toast.error("Select a clip to split");
      return;
    }
    
    const clipIndex = project.clips.findIndex(clip => clip.id === selectedClipId);
    if (clipIndex === -1) return;
    
    const clip = project.clips[clipIndex];
    
    // Check if current time is within clip bounds
    if (currentTime < clip.position || currentTime > clip.position + clip.duration) {
      toast.error("Playhead must be positioned over the selected clip");
      return;
    }
    
    const splitPoint = currentTime - clip.position;
    
    // Create two new clips
    const clip1: VideoClip = {
      ...clip,
      id: `clip-${Date.now()}-1`,
      end: clip.start + splitPoint,
      duration: splitPoint,
    };
    
    const clip2: VideoClip = {
      ...clip,
      id: `clip-${Date.now()}-2`,
      start: clip.start + splitPoint,
      position: clip.position + splitPoint,
      duration: clip.duration - splitPoint,
    };
    
    // Update project
    const newClips = [...project.clips];
    newClips.splice(clipIndex, 1, clip1, clip2);
    
    setProject(prev => ({
      ...prev,
      clips: newClips,
    }));
    
    setSelectedClipId(clip1.id);
    toast.success("Clip split successfully");
  };

  // Add text overlay
  const addTextOverlay = () => {
    const newOverlay: TextOverlay = {
      id: `text-${Date.now()}`,
      text: "Enter text here",
      position: { x: 50, y: 50 },
      style: {
        color: "#ffffff",
        fontSize: "24px",
        fontFamily: "Arial",
      },
      startTime: currentTime,
      endTime: currentTime + 5, // 5 seconds duration by default
    };
    
    setProject(prev => ({
      ...prev,
      textOverlays: [...prev.textOverlays, newOverlay],
    }));
    
    setSelectedOverlayId(newOverlay.id);
    toast.success("Text overlay added");
  };

  // Update text overlay
  const updateTextOverlay = (id: string, updates: Partial<TextOverlay>) => {
    setProject(prev => ({
      ...prev,
      textOverlays: prev.textOverlays.map(overlay => 
        overlay.id === id ? { ...overlay, ...updates } : overlay
      ),
    }));
  };

  // Apply filter to video
  const handleApplyFilter = (filter: any) => {
    if (filter.isPremium) {
      toast.info("This is a premium filter. Upgrade to access all filters!");
      return;
    }
    setProject(prev => ({
      ...prev,
      currentFilter: filter.id
    }));
    toast.success(`Applied "${filter.name}" filter`);
  };

  // Apply aspect ratio
  const handleAspectRatioChange = (ratio: any) => {
    setProject(prev => ({
      ...prev,
      aspectRatio: ratio.id
    }));
  };

  // Handle template selection
  const handleTemplateSelect = (template: any) => {
    if (template.isPremium) {
      toast.info("This is a premium template. Upgrade to access all templates!");
      return;
    }
    toast.success(`Template "${template.name}" selected!`);
    // In a real app, this would load the template assets and configuration
  };

  // Export video (mock functionality for now)
  const exportVideo = () => {
    toast.info("Preparing to export video...");
    setTimeout(() => {
      toast.success("Video exported successfully! (Simulated)");
    }, 2000);
  };

  // Animation loop for playback
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }
    
    const animate = () => {
      if (videoRef.current) {
        setCurrentTime(videoRef.current.currentTime);
        
        // Stop at the end of the project
        if (videoRef.current.currentTime >= project.duration) {
          setIsPlaying(false);
          setCurrentTime(0);
          videoRef.current.currentTime = 0;
        }
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    if (videoRef.current) {
      videoRef.current.play();
    }
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPlaying, project.duration]);

  // Render the current frame on canvas (simplified version)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx || !videoRef.current) return;
    
    // Draw video frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    // Draw text overlays
    project.textOverlays.forEach(overlay => {
      if (currentTime >= overlay.startTime && currentTime <= overlay.endTime) {
        ctx.fillStyle = overlay.style.color;
        ctx.font = `${overlay.style.fontSize} ${overlay.style.fontFamily}`;
        ctx.fillText(overlay.text, overlay.position.x, overlay.position.y);
      }
    });
  }, [currentTime, project.textOverlays]);

  // Keep drag-and-drop for clips in VideoEditor so project.clips can be updated
  const handleClipDrop = (fromId: string, toIndex: number) => {
    const fromIndex = project.clips.findIndex(c => c.id === fromId);
    if (fromIndex === -1) return;
    if (fromIndex === toIndex) return;
    const newClips = [...project.clips];
    const [moved] = newClips.splice(fromIndex, 1);
    newClips.splice(toIndex, 0, moved);
    setProject(prev => ({
      ...prev,
      clips: newClips,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-[#E8F7E4] via-[#B0D9FF] to-[#E7F5FF]">
      <div className="flex-none p-4 bg-white/80 dark:bg-editor-darker/90 shadow studio-card border-0">
        <h1 className="text-3xl font-extrabold font-ui text-blue-900 mb-0 tracking-tight select-none">VideoVibesCraft</h1>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-80 studio-sidebar pr-0 border-0">
          <SidebarPanels
            handleFileUpload={handleFileUpload}
            addTextOverlay={addTextOverlay}
            selectedOverlayId={selectedOverlayId}
            textOverlays={project.textOverlays}
            onUpdateOverlay={updateTextOverlay}
            selectedClipId={selectedClipId}
            setSelectedClipId={setSelectedClipId}
            clips={project.clips}
          />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col px-8 py-6 overflow-hidden studio-panel">
          {/* New feature buttons */}
          <div className="flex justify-center space-x-2 mb-4 max-w-3xl mx-auto">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 bg-white/80 hover:bg-blue-50 text-blue-700 border-blue-200"
              onClick={() => setShowTemplateLibrary(!showTemplateLibrary)}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>Templates</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 bg-white/80 hover:bg-blue-50 text-blue-700 border-blue-200"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 bg-white/80 hover:bg-blue-50 text-blue-700 border-blue-200"
              onClick={() => setShowAspectRatio(!showAspectRatio)}
            >
              <ArrowUpDown className="h-4 w-4" />
              <span>Aspect Ratio</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 bg-white/80 hover:bg-blue-50 text-blue-700 border-blue-200"
              onClick={() => toast.info("This feature will be available soon!")}
              disabled
            >
              <Captions className="h-4 w-4" />
              <span>Captions</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 bg-white/80 hover:bg-blue-50 text-blue-700 border-blue-200"
              onClick={() => toast.info("This feature will be available soon!")}
              disabled
            >
              <Music className="h-4 w-4" />
              <span>Music</span>
            </Button>
          </div>
          
          {/* Template library panel */}
          {showTemplateLibrary && (
            <div className="mb-4 max-w-3xl mx-auto">
              <TemplateLibrary onSelectTemplate={handleTemplateSelect} />
            </div>
          )}
          
          {/* Filters panel */}
          {showFilters && (
            <div className="mb-4 max-w-3xl mx-auto">
              <VideoFilters onApplyFilter={handleApplyFilter} currentFilterId={project.currentFilter} />
            </div>
          )}
          
          {/* Aspect ratio panel */}
          {showAspectRatio && (
            <div className="mb-4 max-w-3xl mx-auto">
              <AspectRatioSelector onSelectRatio={handleAspectRatioChange} currentRatio={project.aspectRatio} />
            </div>
          )}
          
          {/* Preview */}
          <div className="flex-1 flex items-center justify-center mb-3 relative">
            <VideoPreview
              clips={project.clips}
              textOverlays={project.textOverlays}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              projectDuration={project.duration}
              currentFilter={project.currentFilter}
              aspectRatio={project.aspectRatio}
            />
          </div>
          {/* Controls */}
          <VideoControls
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            seekTo={seekTo}
            currentTime={currentTime}
            duration={project.duration}
          />
          {/* Video Toolbar */}
          <VideoToolbar
            onSplit={splitClip}
            onExport={exportVideo}
            hasSelectedClip={!!selectedClipId}
          />
          {/* Timeline */}
          <VideoTimeline
            project={project}
            currentTime={currentTime}
            selectedClipId={selectedClipId}
            onSeek={seekTo}
            onSelectClip={setSelectedClipId}
          />
          {/* Export & Sharing Info Bar */}
          <div className="mt-3 px-4 py-2 flex items-center justify-between studio-card text-[13px] text-blue-900">
            <span>
              Export to MP4, MOV, AVI &amp; more (multi-resolution export coming soon)
            </span>
            <span>
              <span className="font-semibold text-blue-900">Cross-platform</span>: Edit on web, desktop, and mobile (coming soon)
            </span>
          </div>
          
          {/* Feature highlights / monetization info */}
          <div className="mt-4 grid grid-cols-3 gap-3 max-w-4xl mx-auto">
            <div className="bg-white/80 shadow rounded-xl p-4 border border-blue-100">
              <div className="flex items-center text-blue-700 font-medium mb-2">
                <Store className="h-5 w-5 mr-2 text-blue-500" />
                Template Marketplace
              </div>
              <p className="text-xs text-blue-700">
                Create and sell your own video templates or purchase from professionals.
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="mt-2 text-blue-600 h-auto p-0"
              >
                Explore marketplace
              </Button>
            </div>
            
            <div className="bg-white/80 shadow rounded-xl p-4 border border-blue-100">
              <div className="flex items-center text-blue-700 font-medium mb-2">
                <Users className="h-5 w-5 mr-2 text-blue-500" />
                Collaboration
              </div>
              <p className="text-xs text-blue-700">
                Work with your team in real-time and share feedback instantly.
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="mt-2 text-blue-600 h-auto p-0"
              >
                Invite collaborators
              </Button>
            </div>
            
            <div className="bg-white/80 shadow rounded-xl p-4 border border-blue-100">
              <div className="flex items-center text-blue-700 font-medium mb-2">
                <Share className="h-5 w-5 mr-2 text-blue-500" />
                Social Export
              </div>
              <p className="text-xs text-blue-700">
                Publish directly to social media platforms with one click.
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="mt-2 text-blue-600 h-auto p-0"
              >
                Connect accounts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper to format time as MM:SS.ms
const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds === 0) return '00:00.0';
  
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms}`;
};

export default VideoEditor;
