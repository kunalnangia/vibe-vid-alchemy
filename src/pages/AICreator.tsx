
import React, { useState, useEffect } from 'react';
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Wand2, Video, Sparkles, FileText, Loader2 } from "lucide-react";

const AICreator = () => {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [scriptResult, setScriptResult] = useState("");
  const [activeTab, setActiveTab] = useState("script");
  const [scriptLength, setScriptLength] = useState("Medium (2-5 minutes)");
  const [tone, setTone] = useState("Professional");
  const [voiceType, setVoiceType] = useState("Male - Professional");
  const [accent, setAccent] = useState("American");
  const [style, setStyle] = useState("Modern");
  const [colorTheme, setColorTheme] = useState("Neutral");
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt first");
      return;
    }
    
    setGenerating(true);
    toast.loading("Generating content with AI...", { id: "ai-generate" });
    
    try {
      // Create the prompt based on the active tab and settings
      let fullPrompt = '';
      
      if (activeTab === "script") {
        fullPrompt = `Create a ${scriptLength} video script with a ${tone} tone about: ${prompt}`;
      } else if (activeTab === "voiceover") {
        fullPrompt = `Create a ${voiceType} voiceover script with ${accent} accent about: ${prompt}`;
      } else if (activeTab === "b-roll") {
        fullPrompt = `Suggest ${style} style b-roll footage with a ${colorTheme} color theme for a video about: ${prompt}`;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let result = '';
      
      if (activeTab === "script") {
        result = `# Video Script: ${prompt}

## Introduction (0:00 - 0:30)
- Welcome viewers with an engaging hook: "Have you ever wondered about ${prompt}?"
- Introduce the main topic: "${prompt}"
- Outline what viewers will learn: key insights, practical tips, and actionable steps

## Main Content (0:30 - ${scriptLength.includes("Short") ? "1:30" : scriptLength.includes("Medium") ? "3:30" : "6:30"})
- Explain the first key point with examples related to ${prompt}
- Demonstrate the second key concept with visuals showcasing ${prompt} in action
- Share insights and benefits that viewers will gain from understanding ${prompt}
- Include personal stories or case studies that illustrate the power of ${prompt}

## Call to Action (${scriptLength.includes("Short") ? "1:30" : scriptLength.includes("Medium") ? "3:30" : "6:30"} - ${scriptLength.includes("Short") ? "2:00" : scriptLength.includes("Medium") ? "4:00" : "7:00"})
- Summarize the main takeaways about ${prompt}
- Encourage viewers to like and subscribe for more content
- Promote related content about ${prompt} that viewers might find valuable

## Visual Notes
- Use dynamic transitions between sections to maintain viewer interest
- Include overlay text for key statistics and data points about ${prompt}
- Implement lower-third graphics for important points and expert quotes
- Consider including animated diagrams to explain complex concepts`;
      } else if (activeTab === "voiceover") {
        result = `Hello and welcome to this ${tone.toLowerCase()} presentation about ${prompt}! 

Today, we're going to explore this fascinating topic in detail. I'm excited to share with you the key insights that will help you understand ${prompt} better.

Let's start by breaking down the fundamental concepts. First, we'll look at the main principles of ${prompt}, then explore practical applications, and finally discuss how you can implement these ideas in your own projects.

Throughout this presentation, I'll be sharing real-world examples and case studies that demonstrate the power of ${prompt} in action. These stories will help illustrate the concepts in a tangible way.

Stay with me until the end for some exclusive tips that most people miss when working with ${prompt}. These insights could make all the difference in your success.

Thank you for joining me today. Let's dive in and discover the world of ${prompt} together!`;
      } else if (activeTab === "b-roll") {
        result = `# B-Roll Suggestions for ${prompt} (${style} Style, ${colorTheme} Color Theme)

## Establishing Shots
- Wide aerial view of relevant location or setting
- Time-lapse of environment related to ${prompt}
- Slow panning shots of key locations

## Detail Shots
• Close-up shots of hands interacting with objects related to ${prompt}
• Macro footage of textures and materials
• Specific equipment or tools being used

## People Shots
• Subject matter experts discussing or demonstrating concepts
• Natural reactions of people engaging with ${prompt}
• Over-the-shoulder perspectives showing detailed work

## Transition Sequences
• Motion blur transitions between major scenes
• Object-based transitions (items filling the frame)
• Natural environment transitions (light changing, weather)

## Background Footage
• Ambient environment shots for voice-over sections
• Abstract visuals that represent ${prompt} conceptually
• Subtle motion graphics with ${colorTheme} color palette

## Highlight Sequences
• Slow-motion footage of key moments
• Dramatic reveals of important elements
• Before/after comparisons related to ${prompt}`;
      }
      
      setScriptResult(result);
      toast.success("Content generated successfully!", { id: "ai-generate" });
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.", { id: "ai-generate" });
    } finally {
      setGenerating(false);
    }
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
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={scriptLength}
                          onChange={(e) => setScriptLength(e.target.value)}
                        >
                          <option>Short (1-2 minutes)</option>
                          <option>Medium (2-5 minutes)</option>
                          <option>Long (5-10 minutes)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Tone</label>
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={tone}
                          onChange={(e) => setTone(e.target.value)}
                        >
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
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={voiceType}
                          onChange={(e) => setVoiceType(e.target.value)}
                        >
                          <option>Male - Professional</option>
                          <option>Female - Professional</option>
                          <option>Male - Casual</option>
                          <option>Female - Casual</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Accent</label>
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={accent}
                          onChange={(e) => setAccent(e.target.value)}
                        >
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
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={style}
                          onChange={(e) => setStyle(e.target.value)}
                        >
                          <option>Modern</option>
                          <option>Vintage</option>
                          <option>Corporate</option>
                          <option>Cinematic</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Color Theme</label>
                        <select 
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={colorTheme}
                          onChange={(e) => setColorTheme(e.target.value)}
                        >
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
                    disabled={generating || !prompt.trim()}
                  >
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2 h-5 w-5" />
                        Generate with AI
                      </>
                    )}
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setScriptResult((prev) => {
                            // Enable editing by setting the state again, which would re-render the component
                            toast.success("Now you can edit the generated content");
                            return prev;
                          });
                        }}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => {
                          toast.success("Content applied to editor");
                        }}
                      >
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
