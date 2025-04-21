
import React, { useState } from "react";
import { Music, Search, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  category: string;
  previewUrl: string | null;
}

const StockMusicPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioTracks: AudioTrack[] = [
    {
      id: "track-1",
      title: "Summer Vibes",
      artist: "AudioWave",
      duration: "2:45",
      category: "Upbeat",
      previewUrl: null
    },
    {
      id: "track-2",
      title: "Calm Waters",
      artist: "SoundScape",
      duration: "3:12",
      category: "Ambient",
      previewUrl: null
    },
    {
      id: "track-3",
      title: "Epic Journey",
      artist: "MusicMasters",
      duration: "4:05",
      category: "Cinematic",
      previewUrl: null
    }
  ];
  
  const filteredTracks = audioTracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handlePlayPause = (track: AudioTrack) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
    
    // In production, this would trigger actual audio playback
    if (!track.previewUrl) {
      toast.info("Preview not available in demo mode");
    }
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    if (isMuted && value[0] > 0) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleAddToProject = () => {
    if (!currentTrack) {
      toast.warning("Please select a track first");
      return;
    }
    
    toast.success(`"${currentTrack.title}" added to project`);
  };

  return (
    <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
      <h2 className="flex gap-2 items-center text-lg font-bold text-blue-900 mb-3">
        <Music className="w-5 h-5 text-purple-600" /> Stock Music &amp; SFX Library
      </h2>
      <p className="text-sm text-blue-800 mb-3">
        Browse royalty-free music and sound effects to enhance your content.
        <span className="ml-1 font-semibold text-yellow-500">Full access: Pro/Subscription</span>
      </p>
      
      {/* Search bar */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search by title, artist or mood..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Audio tracks list */}
      <div className="mb-4 max-h-60 overflow-y-auto">
        {filteredTracks.length > 0 ? (
          filteredTracks.map(track => (
            <div 
              key={track.id}
              className={`p-3 mb-2 rounded-lg flex items-center justify-between ${
                currentTrack?.id === track.id 
                  ? 'bg-purple-100 border border-purple-300' 
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex-1">
                <div className="font-medium text-blue-900">{track.title}</div>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>{track.artist}</span>
                  <span className="bg-purple-100 text-purple-800 px-2 rounded-full">{track.category}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{track.duration}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => handlePlayPause(track)}
                >
                  {currentTrack?.id === track.id && isPlaying 
                    ? <Pause className="h-4 w-4" /> 
                    : <Play className="h-4 w-4" />
                  }
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">No tracks found</div>
        )}
      </div>
      
      {/* Audio player controls */}
      <div className="flex items-center gap-3 mb-4">
        <Button
          variant="ghost"
          size="sm"
          className="p-2"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <div className="flex-1">
          <Slider
            value={[isMuted ? 0 : volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleVolumeChange}
            className="w-full"
          />
        </div>
        <span className="text-xs text-gray-500 w-8 text-right">
          {isMuted ? "0%" : `${volume}%`}
        </span>
      </div>
      
      <Button 
        className="bg-gradient-to-r from-purple-500 to-pink-400 text-white px-5 font-semibold rounded-lg w-full"
        onClick={handleAddToProject}
        disabled={!currentTrack}
      >
        {currentTrack ? `Add "${currentTrack.title}" to Project` : "Select a Track"}
      </Button>
      <div className="mt-3 text-xs text-blue-600">Submit your own tracks or acquire licenses for exclusive SFX!</div>
    </div>
  );
};

export default StockMusicPanel;
