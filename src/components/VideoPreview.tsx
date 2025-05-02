import React, { useState, useEffect } from 'react';
import { VideoPreviewProps } from '@/lib/video/types';
import VideoCanvas from './video/VideoCanvas';
import VideoStatusIndicators from './video/VideoStatusIndicators';
import { Button } from './ui/button';
import { 
  Camera, 
  Subtitles, 
  Volume2, 
  Settings, 
  CheckCircle2, 
  X,
  ChevronUp,
  ChevronDown,
  Edit,
  Upload,
  Download,
  Trash
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';

const VideoPreview: React.FC<VideoPreviewProps> = ({
  clips = [],
  textOverlays = [],
  currentTime = 0,
  setCurrentTime = () => {},
  isPlaying = false,
  setIsPlaying = () => {},
  projectDuration = 25,
  currentFilter = 'normal',
  aspectRatio = 'landscape',
  greenScreenEnabled = false,
  autoCaptionsEnabled = false
}) => {
  const [localGreenScreenEnabled, setLocalGreenScreenEnabled] = useState(greenScreenEnabled);
  const [localCaptionsEnabled, setLocalCaptionsEnabled] = useState(autoCaptionsEnabled);
  const [showControls, setShowControls] = useState(true);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [chromaKeyColor, setChromaKeyColor] = useState("#00FF00");
  const [chromaKeySensitivity, setChromaKeySensitivity] = useState(50);
  const [backgroundImage, setBackgroundImage] = useState("");
  
  // Captions state
  const [captions, setCaptions] = useState([
    { id: 1, text: "Welcome to our product showcase", startTime: 0, endTime: 3 },
    { id: 2, text: "This innovative solution will transform your workflow", startTime: 4, endTime: 8 },
    { id: 3, text: "Let me show you how it works", startTime: 9, endTime: 12 }
  ]);
  const [editingCaption, setEditingCaption] = useState<number | null>(null);
  const [captionText, setCaptionText] = useState("");
  const [captionStart, setCaptionStart] = useState(0);
  const [captionEnd, setCaptionEnd] = useState(0);
  
  // Audio settings state
  const [audioVolume, setAudioVolume] = useState(80);
  const [backgroundMusicVolume, setBackgroundMusicVolume] = useState(40);
  const [selectedBackgroundTrack, setSelectedBackgroundTrack] = useState("None");
  const [audioNormalization, setAudioNormalization] = useState(true);
  const [audioBoost, setAudioBoost] = useState(false);
  
  // Keep local state in sync with props
  useEffect(() => {
    setLocalGreenScreenEnabled(greenScreenEnabled);
  }, [greenScreenEnabled]);
  
  useEffect(() => {
    setLocalCaptionsEnabled(autoCaptionsEnabled);
  }, [autoCaptionsEnabled]);

  // Error handling for video loading issues
  const [hasError, setHasError] = useState(false);
  
  const handleVideoError = () => {
    setHasError(true);
  };
  
  const resetVideoError = () => {
    setHasError(false);
  };

  // Handle caption editing
  const handleEditCaption = (caption: any) => {
    setEditingCaption(caption.id);
    setCaptionText(caption.text);
    setCaptionStart(caption.startTime);
    setCaptionEnd(caption.endTime);
  };

  const handleSaveCaption = () => {
    if (editingCaption) {
      setCaptions(captions.map(c => 
        c.id === editingCaption 
          ? { ...c, text: captionText, startTime: captionStart, endTime: captionEnd } 
          : c
      ));
      setEditingCaption(null);
      toast.success("Caption updated");
    }
  };

  const handleDeleteCaption = (id: number) => {
    setCaptions(captions.filter(c => c.id !== id));
    toast.success("Caption deleted");
  };

  const handleAddCaption = () => {
    const newId = Math.max(...captions.map(c => c.id), 0) + 1;
    setCaptions([...captions, { 
      id: newId, 
      text: "New caption", 
      startTime: Math.round(currentTime), 
      endTime: Math.round(currentTime) + 3 
    }]);
    toast.success("Caption added");
  };

  return (
    <div className="video-preview-container flex flex-col items-center justify-start bg-black/5 p-6 rounded-lg shadow-inner mb-8 mt-4">
      <div className="mb-4 w-full flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowControls(!showControls)}
          className="flex items-center gap-1"
        >
          <Settings className="h-4 w-4" />
          {showControls ? "Hide" : "Show"} Controls
          {showControls ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </Button>
        
        <div className="flex space-x-2">
          {showControls && (
            <>
              {/* Chroma Key / Green Screen Button */}
              <Dialog open={activeDialog === 'chroma'} onOpenChange={(open) => setActiveDialog(open ? 'chroma' : null)}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={localGreenScreenEnabled ? "bg-green-100 text-green-800 border-green-300" : ""}
                    onClick={() => setActiveDialog('chroma')}
                  >
                    <Camera className="h-4 w-4 mr-1" />
                    Chroma Key
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Chroma Key Settings</DialogTitle>
                    <DialogDescription>
                      Configure green screen removal and background replacement
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 my-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Enable Chroma Key</span>
                      <div 
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                          localGreenScreenEnabled ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                        onClick={() => setLocalGreenScreenEnabled(!localGreenScreenEnabled)}
                      >
                        <div 
                          className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                            localGreenScreenEnabled ? 'translate-x-6' : 'translate-x-0'
                          }`} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Key Color</label>
                      <div className="flex gap-2">
                        <div 
                          className="w-10 h-10 border rounded cursor-pointer"
                          style={{ backgroundColor: chromaKeyColor }}
                          onClick={() => toast.info("Click on the video to select color")}
                        />
                        <Input 
                          type="color"
                          value={chromaKeyColor}
                          onChange={(e) => setChromaKeyColor(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Sensitivity: {chromaKeySensitivity}%</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={chromaKeySensitivity} 
                        onChange={(e) => setChromaKeySensitivity(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Background</label>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {['beach.jpg', 'office.jpg', 'studio.jpg'].map(bg => (
                          <div 
                            key={bg} 
                            className={`h-16 bg-gray-200 rounded cursor-pointer border-2 ${
                              backgroundImage === bg ? 'border-blue-500' : 'border-transparent'
                            }`}
                            onClick={() => {
                              setBackgroundImage(bg);
                              toast.success(`Background set to ${bg}`);
                            }}
                          >
                            <div className="h-full flex items-center justify-center text-xs text-gray-600">
                              {bg}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          toast.info("Upload custom background");
                        }}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Background
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button 
                        onClick={() => {
                          toast.success("Chroma key settings applied");
                        }}
                      >
                        Apply Settings
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Captions Button */}
              <Dialog open={activeDialog === 'captions'} onOpenChange={(open) => setActiveDialog(open ? 'captions' : null)}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={localCaptionsEnabled ? "bg-blue-100 text-blue-800 border-blue-300" : ""}
                    onClick={() => setActiveDialog('captions')}
                  >
                    <Subtitles className="h-4 w-4 mr-1" />
                    Captions
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Caption Settings</DialogTitle>
                    <DialogDescription>
                      Add and edit captions for your video
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 my-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Enable Captions</span>
                      <div 
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                          localCaptionsEnabled ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                        onClick={() => setLocalCaptionsEnabled(!localCaptionsEnabled)}
                      >
                        <div 
                          className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                            localCaptionsEnabled ? 'translate-x-6' : 'translate-x-0'
                          }`} 
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Caption List</h3>
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast.loading("Generating captions from audio...");
                            setTimeout(() => {
                              toast.success("Captions generated successfully");
                            }, 2500);
                          }}
                        >
                          Auto Generate
                        </Button>
                        <Button 
                          size="sm"
                          onClick={handleAddCaption}
                        >
                          Add Caption
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-4 py-2 font-medium text-sm grid grid-cols-12 gap-2">
                        <div className="col-span-1">#</div>
                        <div className="col-span-6">Text</div>
                        <div className="col-span-2">Start</div>
                        <div className="col-span-2">End</div>
                        <div className="col-span-1"></div>
                      </div>
                      
                      <div className="max-h-64 overflow-y-auto">
                        {captions.map(caption => (
                          <div key={caption.id} className="px-4 py-3 border-t grid grid-cols-12 gap-2 items-center hover:bg-gray-50">
                            {editingCaption === caption.id ? (
                              <>
                                <div className="col-span-1">{caption.id}</div>
                                <div className="col-span-6">
                                  <Input 
                                    value={captionText} 
                                    onChange={(e) => setCaptionText(e.target.value)}
                                  />
                                </div>
                                <div className="col-span-2">
                                  <Input 
                                    type="number" 
                                    value={captionStart}
                                    min={0}
                                    step={0.5}
                                    onChange={(e) => setCaptionStart(parseFloat(e.target.value))}
                                  />
                                </div>
                                <div className="col-span-2">
                                  <Input 
                                    type="number" 
                                    value={captionEnd}
                                    min={captionStart + 0.5}
                                    step={0.5}
                                    onChange={(e) => setCaptionEnd(parseFloat(e.target.value))}
                                  />
                                </div>
                                <div className="col-span-1 flex justify-end space-x-1">
                                  <Button size="icon" variant="ghost" onClick={() => setEditingCaption(null)}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost" onClick={handleSaveCaption}>
                                    <CheckCircle2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="col-span-1">{caption.id}</div>
                                <div className="col-span-6 truncate">{caption.text}</div>
                                <div className="col-span-2">{caption.startTime}s</div>
                                <div className="col-span-2">{caption.endTime}s</div>
                                <div className="col-span-1 flex justify-end space-x-1">
                                  <Button size="icon" variant="ghost" onClick={() => handleEditCaption(caption)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="icon" variant="ghost" onClick={() => handleDeleteCaption(caption.id)}>
                                    <Trash className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast.success("Captions exported");
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Export SRT
                        </Button>
                      </div>
                      <div>
                        Total: {captions.length} captions
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Audio Settings Button */}
              <Dialog open={activeDialog === 'audio'} onOpenChange={(open) => setActiveDialog(open ? 'audio' : null)}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveDialog('audio')}
                  >
                    <Volume2 className="h-4 w-4 mr-1" />
                    Audio
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Audio Settings</DialogTitle>
                    <DialogDescription>
                      Adjust audio levels and add background music
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-5 my-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Main Audio Volume: {audioVolume}%</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={audioVolume} 
                        onChange={(e) => setAudioVolume(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <label className="block text-sm font-medium">Background Music</label>
                      
                      <div>
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={selectedBackgroundTrack}
                          onChange={(e) => {
                            setSelectedBackgroundTrack(e.target.value);
                            if (e.target.value !== "None") {
                              toast.success(`Background track set to ${e.target.value}`);
                            }
                          }}
                        >
                          <option>None</option>
                          <option>Upbeat Corporate</option>
                          <option>Inspiring Technology</option>
                          <option>Gentle Acoustic</option>
                          <option>Epic Cinematic</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Background Music Volume: {backgroundMusicVolume}%</label>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={backgroundMusicVolume} 
                          disabled={selectedBackgroundTrack === "None"}
                          onChange={(e) => setBackgroundMusicVolume(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => {
                          toast.info("Upload custom background music");
                        }}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Music
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <label className="block text-sm font-medium">Advanced Audio</label>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Audio Normalization</span>
                        <div 
                          className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                            audioNormalization ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          onClick={() => setAudioNormalization(!audioNormalization)}
                        >
                          <div 
                            className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                              audioNormalization ? 'translate-x-6' : 'translate-x-0'
                            }`} 
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Voice Boost</span>
                        <div 
                          className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                            audioBoost ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          onClick={() => setAudioBoost(!audioBoost)}
                        >
                          <div 
                            className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                              audioBoost ? 'translate-x-6' : 'translate-x-0'
                            }`} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button 
                        onClick={() => {
                          toast.success("Audio settings applied");
                        }}
                      >
                        Apply Settings
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
      
      {hasError ? (
        <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg w-full">
          <p className="text-red-600 font-medium mb-3">Video loading error</p>
          <Button 
            variant="destructive"
            onClick={resetVideoError}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <VideoCanvas
          clips={clips}
          textOverlays={textOverlays}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          projectDuration={projectDuration}
          currentFilter={currentFilter}
          aspectRatio={aspectRatio}
          greenScreenEnabled={localGreenScreenEnabled}
          autoCaptionsEnabled={localCaptionsEnabled}
          onError={handleVideoError}
        />
      )}
      
      <VideoStatusIndicators 
        aspectRatio={aspectRatio}
        greenScreenEnabled={localGreenScreenEnabled}
        autoCaptionsEnabled={localCaptionsEnabled}
        isLoading={clips.length > 0 && !hasError}
      />
    </div>
  );
};

export default VideoPreview;
