
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Scissors, Download, Music, 
  Captions, Video, Filter,
  Share, Play, Pause
} from 'lucide-react';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VideoToolbarProps {
  onSplit: () => void;
  onExport: () => void;
  hasSelectedClip: boolean;
}

const VideoToolbar: React.FC<VideoToolbarProps> = ({
  onSplit,
  onExport,
  hasSelectedClip,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSharingDialog, setShowSharingDialog] = useState(false);
  const [showAudioDialog, setShowAudioDialog] = useState(false);
  const [showEffectsDialog, setShowEffectsDialog] = useState(false);
  const [showCaptionsDialog, setShowCaptionsDialog] = useState(false);
  const [showChromaKeyDialog, setShowChromaKeyDialog] = useState(false);

  const handleSplit = () => {
    if (!hasSelectedClip) {
      toast.error("Please select a clip first");
      return;
    }
    onSplit();
  };

  const handleChromaKey = () => {
    setShowChromaKeyDialog(true);
  };

  const handleCaptions = () => {
    setShowCaptionsDialog(true);
  };

  const handleAudio = () => {
    setShowAudioDialog(true);
  };

  const handleEffects = () => {
    setShowEffectsDialog(true);
  };

  const handleShare = () => {
    setShowSharingDialog(true);
  };

  const handleExport = () => {
    onExport();
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    toast.info(isPlaying ? "Video paused" : "Video playing");
  };

  return (
    <>
      <div className="flex items-center space-x-3 mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#E8F7E4] via-[#B0D9FF] to-[#E7F5FF] shadow-xl studio-card border border-blue-300 max-w-3xl mx-auto font-ui">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSplit}
          disabled={!hasSelectedClip}
          className="flex items-center rounded-lg font-semibold border-blue-600 text-blue-900 hover:bg-blue-300 hover:text-blue-900 shadow-sm"
        >
          <Scissors className="mr-1 h-5 w-5" />
          Split
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center rounded-lg border-blue-300 text-blue-700 hover:bg-blue-200"
          onClick={handleChromaKey}
        >
          <Video className="mr-1 h-5 w-5" />
          Chroma Key
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center rounded-lg border-blue-300 text-blue-700 hover:bg-blue-200"
          onClick={handleCaptions}
        >
          <Captions className="mr-1 h-5 w-5" />
          Captions
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center rounded-lg border-blue-300 text-blue-700 hover:bg-blue-200"
          onClick={handleAudio}
        >
          <Music className="mr-1 h-5 w-5" />
          Audio
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center rounded-lg border-blue-300 text-blue-700 hover:bg-blue-200"
          onClick={handleEffects}
        >
          <Filter className="mr-1 h-5 w-5" />
          Effects
        </Button>
        
        <div className="border-r border-blue-300 h-9"></div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handlePlayToggle}
          className="flex items-center rounded-lg border-blue-300 text-blue-700 hover:bg-blue-200"
        >
          {isPlaying ? (
            <Pause className="mr-1 h-5 w-5" />
          ) : (
            <Play className="mr-1 h-5 w-5" />
          )}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center rounded-lg border-blue-300 text-blue-700 hover:bg-blue-200"
          onClick={handleShare}
        >
          <Share className="mr-1 h-5 w-5" />
          Share
        </Button>
        
        <div className="flex-1"></div>
        
        <Button
          variant="default"
          size="sm"
          onClick={handleExport}
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-md flex items-center rounded-lg font-semibold px-6 text-white"
        >
          <Download className="mr-1 h-5 w-5" />
          Export
        </Button>
      </div>
      
      {/* Sharing Dialog */}
      <Dialog open={showSharingDialog} onOpenChange={setShowSharingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Video</DialogTitle>
            <DialogDescription>
              Share your video with others or on social media platforms.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="share-link">Share Link</Label>
              <div className="flex gap-2">
                <Input id="share-link" value="https://videovibecraft.com/share/v123456" readOnly />
                <Button onClick={() => {
                  navigator.clipboard.writeText("https://videovibecraft.com/share/v123456");
                  toast.success("Link copied to clipboard");
                }}>Copy</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
              <Button variant="outline" className="flex flex-col items-center py-6">
                <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="mt-2">Facebook</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center py-6">
                <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
                <span className="mt-2">Twitter</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center py-6">
                <svg className="h-8 w-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
                <span className="mt-2">YouTube</span>
              </Button>
              
              <Button variant="outline" className="flex flex-col items-center py-6">
                <svg className="h-8 w-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
                <span className="mt-2">Instagram</span>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSharingDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Audio Dialog */}
      <Dialog open={showAudioDialog} onOpenChange={setShowAudioDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Audio Editor</DialogTitle>
            <DialogDescription>
              Adjust audio levels, add music tracks and sound effects.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <h3 className="font-medium mb-2">Main Audio Track</h3>
              <div className="space-y-4">
                <div>
                  <Label>Volume</Label>
                  <div className="flex items-center gap-2">
                    <span>0%</span>
                    <div className="h-2 bg-gray-200 flex-1 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-3/4 rounded-full"></div>
                    </div>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Bass</Label>
                    <div className="flex items-center gap-2">
                      <span>-</span>
                      <div className="h-2 bg-gray-200 flex-1 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-1/2 rounded-full"></div>
                      </div>
                      <span>+</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Treble</Label>
                    <div className="flex items-center gap-2">
                      <span>-</span>
                      <div className="h-2 bg-gray-200 flex-1 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-2/3 rounded-full"></div>
                      </div>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Background Music</h3>
              <div className="space-y-3">
                {['Corporate Upbeat', 'Inspirational Acoustic', 'Tech Innovation'].map((track, idx) => (
                  <div key={idx} className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <Play className="h-4 w-4" />
                      </Button>
                      <span>{track}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Music className="h-4 w-4 text-gray-400" />
                        <div className="h-1.5 bg-gray-200 rounded-full w-16 overflow-hidden">
                          <div className="h-full bg-blue-600 w-3/4 rounded-full"></div>
                        </div>
                      </div>
                      
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" checked={idx === 0} />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2">
                  <Music className="h-4 w-4 mr-2" />
                  Browse Music Library
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAudioDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              setShowAudioDialog(false);
              toast.success("Audio settings applied");
            }}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Effects Dialog */}
      <Dialog open={showEffectsDialog} onOpenChange={setShowEffectsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Video Effects</DialogTitle>
            <DialogDescription>
              Apply visual effects and filters to enhance your video.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-3 py-4">
            {[
              { name: "Normal", class: "" },
              { name: "Vintage", class: "sepia brightness-95" },
              { name: "Dramatic", class: "contrast-125 saturate-150" },
              { name: "Cool", class: "hue-rotate-15 brightness-105" },
              { name: "Warm", class: "sepia-[.35] saturate-150" },
              { name: "B&W", class: "grayscale" },
            ].map((filter, idx) => (
              <div 
                key={idx}
                className={`aspect-video bg-gray-100 rounded-md overflow-hidden cursor-pointer border-2 ${idx === 0 ? 'border-blue-500' : 'border-transparent'} hover:border-blue-300`}
              >
                <div className={`w-full h-full flex items-center justify-center ${filter.class}`} style={{backgroundImage: 'url(https://images.unsplash.com/photo-1585314062604-1a357de8b000?w=300)', backgroundSize: 'cover'}}>
                </div>
                <div className="text-center text-sm font-medium mt-1">{filter.name}</div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4 py-4">
            <div>
              <Label>Brightness</Label>
              <div className="flex items-center gap-2 mt-1">
                <span>-</span>
                <div className="h-2 bg-gray-200 flex-1 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-1/2 rounded-full"></div>
                </div>
                <span>+</span>
              </div>
            </div>
            
            <div>
              <Label>Contrast</Label>
              <div className="flex items-center gap-2 mt-1">
                <span>-</span>
                <div className="h-2 bg-gray-200 flex-1 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-2/3 rounded-full"></div>
                </div>
                <span>+</span>
              </div>
            </div>
            
            <div>
              <Label>Saturation</Label>
              <div className="flex items-center gap-2 mt-1">
                <span>-</span>
                <div className="h-2 bg-gray-200 flex-1 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 w-3/4 rounded-full"></div>
                </div>
                <span>+</span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEffectsDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              setShowEffectsDialog(false);
              toast.success("Video effects applied");
            }}>Apply Effects</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Captions Dialog */}
      <Dialog open={showCaptionsDialog} onOpenChange={setShowCaptionsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Caption Editor</DialogTitle>
            <DialogDescription>
              Add and edit captions for your video
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="flex justify-between">
              <Button variant="outline" size="sm">
                Import SRT
              </Button>
              <Button size="sm" onClick={() => {
                toast.success("Auto-generating captions...");
                setTimeout(() => toast.success("Captions generated successfully!"), 2000);
              }}>
                Auto-Generate
              </Button>
            </div>
            
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {[
                { id: 1, start: "00:00:02.500", end: "00:00:05.000", text: "Welcome to our product demonstration" },
                { id: 2, start: "00:00:05.500", end: "00:00:08.500", text: "Today we'll show you the key features" },
                { id: 3, start: "00:00:09.000", end: "00:00:12.000", text: "First, let's start with the user interface" },
                { id: 4, start: "00:00:13.000", end: "00:00:16.500", text: "As you can see, it's very intuitive to use" },
              ].map((caption) => (
                <div key={caption.id} className="border rounded-md p-3">
                  <div className="flex justify-between mb-2">
                    <div className="text-xs text-gray-500">
                      {caption.start} → {caption.end}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </Button>
                    </div>
                  </div>
                  <Input defaultValue={caption.text} />
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Caption Style</h4>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label>Font Size</Label>
                  <select className="w-full border rounded p-1 mt-1 text-sm">
                    <option>Small</option>
                    <option selected>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
                
                <div>
                  <Label>Position</Label>
                  <select className="w-full border rounded p-1 mt-1 text-sm">
                    <option>Top</option>
                    <option selected>Bottom</option>
                    <option>Middle</option>
                  </select>
                </div>
                
                <div>
                  <Label>Color</Label>
                  <select className="w-full border rounded p-1 mt-1 text-sm">
                    <option selected>White</option>
                    <option>Yellow</option>
                    <option>Red</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCaptionsDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              setShowCaptionsDialog(false);
              toast.success("Captions saved");
            }}>Save Captions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Chroma Key Dialog */}
      <Dialog open={showChromaKeyDialog} onOpenChange={setShowChromaKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chroma Key (Green Screen)</DialogTitle>
            <DialogDescription>
              Remove background from your video using color keying
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <Label>Select Key Color</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <button className="h-10 bg-green-500 rounded-md border-2 border-blue-500"></button>
                <button className="h-10 bg-blue-500 rounded-md"></button>
                <button className="h-10 bg-[#00b140] rounded-md"></button>
                <label className="col-span-3 flex items-center justify-center border border-dashed rounded-md p-2 cursor-pointer">
                  <span className="text-sm text-blue-600">+ Custom Color</span>
                  <input type="color" className="sr-only" />
                </label>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Key Settings</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Similarity</Label>
                    <span className="text-sm">40%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[40%] rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Smoothness</Label>
                    <span className="text-sm">25%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-1/4 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Spill Reduction</Label>
                    <span className="text-sm">60%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-3/5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Background</h4>
              <div className="grid grid-cols-3 gap-2">
                <button className="h-16 bg-transparent rounded-md border border-gray-300 flex items-center justify-center text-xs">
                  Transparent
                </button>
                <button className="h-16 bg-blue-100 rounded-md border border-gray-300"></button>
                <button className="h-16 rounded-md border border-gray-300 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1579546929662-711aa81148cf" className="w-full h-full object-cover" alt="Custom background" />
                </button>
                <label className="flex items-center justify-center border border-dashed rounded-md p-2 cursor-pointer bg-gray-50 h-16">
                  <span className="text-xs text-blue-600">+ Custom</span>
                  <input type="file" className="sr-only" />
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChromaKeyDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              setShowChromaKeyDialog(false);
              toast.success("Chroma key effect applied");
            }}>Apply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoToolbar;
