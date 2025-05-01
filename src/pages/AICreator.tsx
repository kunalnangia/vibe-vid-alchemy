
import React, { useState } from 'react';
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Wand2, Video, Sparkles, FileText } from "lucide-react";

const AICreator = () => {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [scriptResult, setScriptResult] = useState("");
  const [activeTab, setActiveTab] = useState("script");
  
  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }
    
    setGenerating(true);
    toast.loading("Generating content with AI...", { id: "ai-generate" });
    
    // Simulate AI generation
    setTimeout(() => {
      let result = "";
      
      if (activeTab === "script") {
        result = `# Video Script: ${prompt}

## Introduction (0:00 - 0:30)
- Welcome viewers with an engaging hook
- Introduce the main topic: "${prompt}"
- Outline what viewers will learn

## Main Content (0:30 - 2:30)
- Explain the first key point with examples
- Demonstrate the second key concept with visuals
- Share insights and benefits related to "${prompt}"

## Call to Action (2:30 - 3:00)
- Summarize the main takeaways
- Encourage viewers to like and subscribe
- Promote related content

## Visual Notes
- Use dynamic transitions between sections
- Include overlay text for key statistics
- Implement lower-third graphics for important points`;
      } else if (activeTab === "voiceover") {
        result = `Hello and welcome to this video about ${prompt}! 

Today, we're going to explore this fascinating topic in detail. I'm excited to share with you the key insights that will help you understand ${prompt} better.

Let's start by breaking down the fundamental concepts. First, we'll look at the main principles, then explore practical applications, and finally discuss how you can implement these ideas in your own projects.

Stay with me until the end for some exclusive tips that most people miss when working with ${prompt}.`;
      } else if (activeTab === "b-roll") {
        result = "AI has suggested relevant B-roll footage for your video on " + prompt + ".\n\n• Close-up shots of relevant subject matter\n• Wide establishing shots for context\n• Transition sequences for smooth editing\n• Background footage for voice-over sections\n• Slow-motion highlights for emphasis";
      }
      
      setScriptResult(result);
      setGenerating(false);
      toast.success("Content generated successfully!", { id: "ai-generate" });
    }, 3000);
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-6">AI Creator Studio</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-purple-700 flex items-center mb-4">
                  <Wand2 className="mr-2 h-5 w-5" />
                  AI Content Generator
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">What would you like to create?</label>
                    <Textarea 
                      placeholder="Describe your video idea in detail (e.g., 'A product showcase for my new eco-friendly water bottle')"
                      className="min-h-[120px]"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="script" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Script
                      </TabsTrigger>
                      <TabsTrigger value="voiceover" className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Voiceover
                      </TabsTrigger>
                      <TabsTrigger value="b-roll" className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        B-Roll
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="script" className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Script Length</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Short (1-2 minutes)</option>
                          <option>Medium (2-5 minutes)</option>
                          <option>Long (5-10 minutes)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Tone</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Professional</option>
                          <option>Conversational</option>
                          <option>Enthusiastic</option>
                          <option>Educational</option>
                        </select>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="voiceover" className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Voice Type</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Male - Professional</option>
                          <option>Female - Professional</option>
                          <option>Male - Casual</option>
                          <option>Female - Casual</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Accent</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>American</option>
                          <option>British</option>
                          <option>Australian</option>
                          <option>No Accent</option>
                        </select>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="b-roll" className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Style</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Modern</option>
                          <option>Vintage</option>
                          <option>Corporate</option>
                          <option>Cinematic</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Color Theme</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Warm</option>
                          <option>Cool</option>
                          <option>Neutral</option>
                          <option>Vibrant</option>
                        </select>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <Button 
                    className="w-full py-6 bg-gradient-to-r from-purple-600 to-blue-500"
                    onClick={handleGenerate}
                    disabled={generating}
                  >
                    <Wand2 className="mr-2 h-5 w-5" />
                    {generating ? "Generating..." : "Generate with AI"}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 h-full">
                <h2 className="text-xl font-semibold text-purple-700 mb-4">Generated Content</h2>
                
                {!scriptResult ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center text-gray-500">
                    <Wand2 className="h-12 w-12 mb-4 text-purple-300" />
                    <p>Your AI-generated content will appear here after you click generate.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-gray-50 whitespace-pre-wrap text-sm min-h-[300px] max-h-[500px] overflow-y-auto">
                      {scriptResult}
                    </div>
                    
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm" onClick={() => {
                        toast.success("Content applied to editor");
                      }}>
                        Apply to Editor
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AICreator;
