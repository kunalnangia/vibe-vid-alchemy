
import React, { useState } from "react";
import { Video, Scissors, Eye, EyeOff, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GreenScreenPanel: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [bgRemoved, setBgRemoved] = useState(false);
  const [sensitivity, setSensitivity] = useState([50]);
  const [smoothness, setSmoothness] = useState([30]);
  const [showOriginal, setShowOriginal] = useState(false);
  
  const handleRemoveBackground = () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setBgRemoved(true);
      toast.success("Background removed successfully!");
    }, 1500);
  };
  
  const toggleOriginal = () => {
    setShowOriginal(!showOriginal);
  };
  
  const resetChanges = () => {
    setBgRemoved(false);
    setSensitivity([50]);
    setSmoothness([30]);
    toast.info("Changes reset");
  };

  return (
    <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
      <h2 className="flex items-center gap-2 text-lg font-bold text-blue-900 mb-3">
        <Video className="w-5 h-5 text-green-500" /> Chroma Key / Green Screen
      </h2>
      
      <Tabs defaultValue="remove">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="remove">Remove Background</TabsTrigger>
          <TabsTrigger value="replace">Replace Background</TabsTrigger>
        </TabsList>
        
        <TabsContent value="remove" className="space-y-4">
          <div className="rounded-lg overflow-hidden bg-black relative">
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              {bgRemoved ? (
                <div className="w-full h-full bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yOS8xMiKqq3kAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAAANklEQVQ4jWNgGAVEAyYG+gD8X0QP/YM0KEirG8ZgIDpeRg3AGwYjJAzwhgGabPA2JkbTAQUAABnNCxpJQELmAAAAAElFTkSuQmCC')] bg-repeat flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-center p-4">
                    Background removed! Toggle to see original.
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-center p-4">
                    Subject on green screen
                  </div>
                </div>
              )}
              
              {showOriginal && bgRemoved && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-center p-4">
                    Subject on green screen
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            {bgRemoved ? (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm text-blue-800 font-medium">Edge Sensitivity</label>
                    <span className="text-sm text-blue-600">{sensitivity[0]}%</span>
                  </div>
                  <Slider
                    value={sensitivity}
                    onValueChange={setSensitivity}
                    min={0}
                    max={100}
                    step={1}
                    className="py-1"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm text-blue-800 font-medium">Edge Smoothness</label>
                    <span className="text-sm text-blue-600">{smoothness[0]}%</span>
                  </div>
                  <Slider
                    value={smoothness}
                    onValueChange={setSmoothness}
                    min={0}
                    max={100}
                    step={1}
                    className="py-1"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={toggleOriginal}
                    variant="outline"
                    className="flex-1"
                  >
                    {showOriginal ? (
                      <>
                        <EyeOff className="mr-2 h-4 w-4" />
                        Hide Original
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Show Original
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={resetChanges}
                    variant="outline"
                    className="flex-1"
                  >
                    Reset Changes
                  </Button>
                </div>
              </>
            ) : (
              <Button 
                onClick={handleRemoveBackground}
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? "Processing..." : "Remove Background"}
              </Button>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="replace" className="space-y-4">
          <div className="rounded-lg overflow-hidden bg-black relative">
            <div className="aspect-video bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-center p-4">
                Subject with custom background
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-video bg-gradient-to-r from-sky-500 to-indigo-500 rounded cursor-pointer hover:ring-2 hover:ring-blue-400"></div>
            <div className="aspect-video bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded cursor-pointer hover:ring-2 hover:ring-blue-400"></div>
            <div className="aspect-video bg-gradient-to-r from-orange-400 to-rose-500 rounded cursor-pointer hover:ring-2 hover:ring-blue-400"></div>
            <div className="aspect-video bg-[url('https://images.unsplash.com/photo-1682687982107-14492010e05e')] bg-cover bg-center rounded cursor-pointer hover:ring-2 hover:ring-blue-400"></div>
            <div className="aspect-video bg-[url('https://images.unsplash.com/photo-1682685797527-63b4e495938f')] bg-cover bg-center rounded cursor-pointer hover:ring-2 hover:ring-blue-400"></div>
            <div className="aspect-video bg-blue-100 rounded cursor-pointer hover:ring-2 hover:ring-blue-400 flex items-center justify-center">
              <div className="text-xs text-blue-500">Custom...</div>
            </div>
          </div>
          
          <Button className="w-full">
            <Wand2 className="mr-2 h-4 w-4" />
            Apply Selected Background
          </Button>
        </TabsContent>
      </Tabs>
      
      <div className="mt-4 text-xs text-blue-600">
        Tip: For best results, use footage with a solid colored background for chroma keying.
      </div>
    </div>
  );
};

export default GreenScreenPanel;
