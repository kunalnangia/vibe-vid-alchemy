
import React, { useState } from "react";
import { Captions, Loader2, Play, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Caption {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

const AutoCaptionsPanel: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [activeTab, setActiveTab] = useState("generate");
  
  const generateCaptions = () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Mock captions for demonstration
    const mockCaptions: Caption[] = [
      { id: "1", startTime: 0, endTime: 2.5, text: "Hey everyone, welcome to this video!" },
      { id: "2", startTime: 3, endTime: 5.5, text: "Today we're going to explore video editing." },
      { id: "3", startTime: 6, endTime: 9, text: "Let's see how we can add captions automatically." },
      { id: "4", startTime: 9.5, endTime: 12, text: "This feature uses AI to transcribe your audio." },
      { id: "5", startTime: 13, endTime: 17, text: "You can edit the captions after they're generated." },
      { id: "6", startTime: 18, endTime: 22, text: "Then export them as SRT or burn them into your video." }
    ];
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          setCaptions(mockCaptions);
          setActiveTab("edit");
          toast.success("Captions generated successfully!");
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };
  
  const handleCaptionEdit = (id: string, text: string) => {
    setCaptions(captions.map(caption => 
      caption.id === id ? { ...caption, text } : caption
    ));
  };
  
  const downloadSRT = () => {
    let srtContent = '';
    captions.forEach((caption, index) => {
      const start = formatTime(caption.startTime).replace('.', ',');
      const end = formatTime(caption.endTime).replace('.', ',');
      
      srtContent += `${index + 1}\n`;
      srtContent += `${start} --> ${end}\n`;
      srtContent += `${caption.text}\n\n`;
    });
    
    const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'captions.srt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("SRT file downloaded");
  };

  return (
    <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
      <h2 className="flex items-center gap-2 text-lg font-bold text-blue-900 mb-3">
        <Captions className="w-5 h-5 text-blue-500" />
        Auto-Captions &amp; Subtitles
      </h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="edit" disabled={captions.length === 0}>Edit Captions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate" className="space-y-4">
          <p className="text-sm text-blue-800">
            Automatically transcribe your video's audio into captions using AI.
          </p>
          
          {isGenerating ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-blue-700">
                <span>Analyzing audio...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          ) : (
            <Button 
              onClick={generateCaptions}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Captions className="mr-2 h-4 w-4" />
                  Generate Auto-Captions
                </>
              )}
            </Button>
          )}
          
          <div className="bg-blue-50 p-3 rounded text-xs text-blue-700">
            <p className="font-medium mb-1">How it works:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>AI analyzes your video's audio track</li>
              <li>Speech is transcribed into text</li>
              <li>Captions are timed to match the speech</li>
              <li>You can edit or adjust the results</li>
            </ol>
          </div>
        </TabsContent>
        
        <TabsContent value="edit">
          {captions.length > 0 ? (
            <div className="space-y-4">
              <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                {captions.map((caption) => (
                  <div key={caption.id} className="border border-blue-100 rounded-md p-2 bg-white">
                    <div className="text-xs text-blue-500 mb-1">
                      {formatTime(caption.startTime)} - {formatTime(caption.endTime)}
                    </div>
                    <textarea
                      value={caption.text}
                      onChange={(e) => handleCaptionEdit(caption.id, e.target.value)}
                      className="w-full text-sm p-2 border border-blue-200 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    toast.success("Captions applied to video");
                  }}
                  className="flex-1"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Apply to Video
                </Button>
                <Button 
                  onClick={downloadSRT}
                  variant="outline" 
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download SRT
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-blue-400">
              Generate captions first
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AutoCaptionsPanel;
