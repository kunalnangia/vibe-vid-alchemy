
import React, { useState, useRef } from "react";
import { Music, Play, Pause, Search, Plus, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  category: string;
  src: string;
}

const StockMusicPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const musicTracks: MusicTrack[] = [
    { id: "1", title: "Summer Vibes", artist: "AudioStock", duration: "2:34", category: "Upbeat", src: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3" },
    { id: "2", title: "Emotional Journey", artist: "MusicPro", duration: "3:12", category: "Cinematic", src: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3" },
    { id: "3", title: "Tech Innovate", artist: "SoundLab", duration: "2:45", category: "Corporate", src: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3" },
    { id: "4", title: "Nature Ambience", artist: "EcoSounds", duration: "4:18", category: "Ambient", src: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3" },
    { id: "5", title: "Epic Cinematic", artist: "FilmScore", duration: "3:52", category: "Cinematic", src: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3" },
    { id: "6", title: "Gentle Piano", artist: "ClassicTouch", duration: "2:15", category: "Instrumental", src: "https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3" },
  ];
  
  const filteredTracks = musicTracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const playTrack = (track: MusicTrack) => {
    if (currentTrack?.id === track.id) {
      // Toggle play/pause for current track
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Play new track
      setCurrentTrack(track);
      setIsPlaying(true);
      
      if (audioRef.current) {
        audioRef.current.src = track.src;
        audioRef.current.volume = volume[0] / 100;
        audioRef.current.play();
      }
    }
  };
  
  const addToTimeline = (track: MusicTrack) => {
    toast.success(`Added "${track.title}" to timeline`);
  };
  
  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100;
    }
    
    if (newVolume[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume[0] / 100;
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
      <h2 className="flex items-center gap-2 text-lg font-bold text-blue-900 mb-3">
        <Music className="w-5 h-5 text-purple-500" /> Stock Music & Sound Effects
      </h2>
      
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text" 
            placeholder="Search by title, artist or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto mb-4 pr-1">
        {filteredTracks.length > 0 ? (
          filteredTracks.map((track) => (
            <div 
              key={track.id} 
              className={`flex items-center justify-between p-2 rounded ${currentTrack?.id === track.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
            >
              <div className="flex items-center gap-3">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0 rounded-full"
                  onClick={() => playTrack(track)}
                >
                  {currentTrack?.id === track.id && isPlaying ? 
                    <Pause className="h-4 w-4" /> : 
                    <Play className="h-4 w-4" />
                  }
                </Button>
                <div>
                  <div className="text-sm font-medium">{track.title}</div>
                  <div className="text-xs text-gray-500 flex gap-2">
                    <span>{track.artist}</span>
                    <span>•</span>
                    <span>{track.duration}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  {track.category}
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => addToTimeline(track)}
                  className="h-7 w-7 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            No tracks found matching your search
          </div>
        )}
      </div>
      
      {currentTrack && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="font-medium text-sm">{currentTrack.title}</div>
              <div className="text-xs text-gray-500">{currentTrack.artist}</div>
            </div>
            <Button 
              size="sm" 
              onClick={() => addToTimeline(currentTrack)}
            >
              <Plus className="mr-1 h-3 w-3" />
              Add to Timeline
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Slider
              value={volume}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-32"
            />
          </div>
          
          <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
        </div>
      )}
      
      <div className="mt-4 flex justify-between items-center text-xs text-blue-600">
        <span>All tracks licensed for commercial use</span>
        <Button 
          size="sm" 
          variant="link" 
          className="text-xs h-auto p-0"
          onClick={() => toast.info("Premium library includes 10,000+ tracks and sound effects")}
        >
          Upgrade for Premium Tracks
        </Button>
      </div>
    </div>
  );
};

export default StockMusicPanel;
