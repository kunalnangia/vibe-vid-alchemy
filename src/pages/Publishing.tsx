
import React, { useState } from 'react';
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Share2, Facebook, Instagram, Twitter, Youtube, Globe, Link as LinkIcon, ArrowRight, Mail, BarChart3, Calendar, Clock, Loader2 } from "lucide-react";

const Publishing = () => {
  // Social media states
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Instagram", "YouTube"]);
  const [socialCaption, setSocialCaption] = useState("Check out our new product release! 🚀 We've been working on this for months and can't wait to hear your feedback. #NewRelease #ProductLaunch");
  const [socialTags, setSocialTags] = useState("product, launch, video, showcase");
  const [isScheduling, setIsScheduling] = useState(false);
  const [publishDate, setPublishDate] = useState(new Date().toISOString().split('T')[0]);
  const [publishTime, setPublishTime] = useState("12:00");
  
  // Website states
  const [pageTitle, setPageTitle] = useState("Product Launch - Special Offer");
  const [urlPath, setUrlPath] = useState("/product-launch");
  const [isGeneratingPage, setIsGeneratingPage] = useState(false);
  const [landingPageGenerated, setLandingPageGenerated] = useState(false);
  
  // Email campaign states
  const [emailSubject, setEmailSubject] = useState("Check out our latest video!");
  const [emailPreheader, setEmailPreheader] = useState("Watch our new product showcase video");
  const [emailBody, setEmailBody] = useState("Hello {{first_name}},\n\nWe're excited to share our latest video with you! Click the button below to watch now.\n\nBest regards,\nThe Team");
  const [isPreparingEmail, setIsPreparingEmail] = useState(false);
  
  // Analytics states
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false);
  
  // Handle platform selection
  const togglePlatform = (platformName: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformName)) {
        return prev.filter(name => name !== platformName);
      } else {
        return [...prev, platformName];
      }
    });
  };

  // Handle social media post scheduling
  const handleSchedulePost = () => {
    if (selectedPlatforms.length === 0) {
      toast.warning("Please select at least one platform");
      return;
    }
    
    setIsScheduling(true);
    
    setTimeout(() => {
      toast.success("Post scheduled successfully!", {
        description: `Scheduled for ${publishDate} at ${publishTime}`
      });
      setIsScheduling(false);
    }, 2000);
  };
  
  // Handle landing page generation
  const handleGenerateLandingPage = () => {
    if (!pageTitle || !urlPath) {
      toast.warning("Please enter both page title and URL path");
      return;
    }
    
    setIsGeneratingPage(true);
    
    toast("Generating landing page...", {
      description: "Creating your custom landing page"
    });
    
    setTimeout(() => {
      toast("Adding video content...");
    }, 1500);
    
    setTimeout(() => {
      toast("Optimizing for conversions...");
    }, 3000);
    
    setTimeout(() => {
      setIsGeneratingPage(false);
      setLandingPageGenerated(true);
      toast.success("Landing page generated!", {
        description: `Your page is live at example.com${urlPath}`
      });
    }, 4500);
  };
  
  // Handle copying URL
  const handleCopyShortLink = () => {
    navigator.clipboard.writeText(`https://yourvid.io/s/${Math.random().toString(36).substring(2, 8)}`);
    toast.success("Link copied to clipboard!");
  };
  
  // Handle view live page
  const handleViewLivePage = () => {
    toast.info("Opening live page in new tab", {
      description: "If no page opened, check your popup blocker"
    });
  };
  
  // Handle email campaign creation
  const handleCreateEmailCampaign = () => {
    if (!emailSubject || !emailBody) {
      toast.warning("Please enter email subject and body");
      return;
    }
    
    setIsPreparingEmail(true);
    
    toast("Creating email campaign...");
    
    setTimeout(() => {
      toast("Adding video content to email...");
    }, 1500);
    
    setTimeout(() => {
      toast("Setting up personalization tokens...");
    }, 3000);
    
    setTimeout(() => {
      setIsPreparingEmail(false);
      toast.success("Email campaign created!", {
        description: "Ready to send to your email list"
      });
    }, 4500);
  };
  
  // Handle analytics dashboard
  const handleViewAnalyticsDashboard = () => {
    setIsLoadingAnalytics(true);
    
    toast("Loading analytics data...");
    
    setTimeout(() => {
      setIsLoadingAnalytics(false);
      toast.success("Analytics dashboard ready", {
        description: "Showing performance metrics across all channels"
      });
    }, 2000);
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-6">Publishing Center</h1>
          
          <Tabs defaultValue="social">
            <TabsList className="mb-6">
              <TabsTrigger value="social" className="px-6">Social Media</TabsTrigger>
              <TabsTrigger value="website" className="px-6">Website & Landing Page</TabsTrigger>
              <TabsTrigger value="email" className="px-6">Email Campaign</TabsTrigger>
              <TabsTrigger value="analytics" className="px-6">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="social">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Share2 className="h-5 w-5 text-purple-600" />
                      Social Media Publishing
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Video Preview */}
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                          <span className="text-gray-400">Video Preview</span>
                        </div>
                        <div>
                          <h3 className="font-medium">Product Showcase Video</h3>
                          <p className="text-sm text-gray-500">00:45 • 1280 x 720</p>
                        </div>
                      </div>
                      
                      {/* Caption */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Caption / Description</label>
                        <Textarea
                          className="w-full border border-gray-300 rounded-md p-3 min-h-[120px]"
                          placeholder="Write an engaging caption for your post..."
                          value={socialCaption}
                          onChange={(e) => setSocialCaption(e.target.value)}
                        />
                      </div>
                      
                      {/* Tags */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Tags</label>
                        <Input
                          placeholder="Add tags separated by commas"
                          value={socialTags}
                          onChange={(e) => setSocialTags(e.target.value)}
                        />
                      </div>
                      
                      {/* Platform specific options */}
                      <div className="space-y-3">
                        <h3 className="font-medium">Platform Options</h3>
                        
                        <div className="flex flex-wrap gap-3">
                          <div 
                            className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer ${
                              selectedPlatforms.includes("Facebook") ? 
                              "bg-blue-100 border-blue-300" : "bg-blue-50"
                            }`}
                            onClick={() => togglePlatform("Facebook")}
                          >
                            <Facebook className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">Facebook</span>
                          </div>
                          <div 
                            className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer ${
                              selectedPlatforms.includes("Instagram") ? 
                              "bg-pink-100 border-pink-300" : "bg-pink-50"
                            }`}
                            onClick={() => togglePlatform("Instagram")}
                          >
                            <Instagram className="h-4 w-4 text-pink-600" />
                            <span className="text-sm">Instagram</span>
                          </div>
                          <div 
                            className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer ${
                              selectedPlatforms.includes("Twitter") ? 
                              "bg-blue-100 border-blue-300" : "bg-blue-50"
                            }`}
                            onClick={() => togglePlatform("Twitter")}
                          >
                            <Twitter className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">Twitter</span>
                          </div>
                          <div 
                            className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer ${
                              selectedPlatforms.includes("YouTube") ? 
                              "bg-red-100 border-red-300" : "bg-red-50"
                            }`}
                            onClick={() => togglePlatform("YouTube")}
                          >
                            <Youtube className="h-4 w-4 text-red-600" />
                            <span className="text-sm">YouTube</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Schedule */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Publish Date</label>
                          <Input
                            type="date"
                            value={publishDate}
                            onChange={(e) => setPublishDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Publish Time</label>
                          <Input
                            type="time"
                            value={publishTime}
                            onChange={(e) => setPublishTime(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3">
                        <Button variant="outline">
                          Save Draft
                        </Button>
                        <Button 
                          onClick={handleSchedulePost}
                          disabled={isScheduling || selectedPlatforms.length === 0}
                        >
                          {isScheduling ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Scheduling...
                            </>
                          ) : (
                            "Schedule Post"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Connected Accounts</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Facebook className="h-5 w-5 text-blue-600" />
                          <span>Facebook</span>
                        </div>
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">Connected</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Instagram className="h-5 w-5 text-pink-600" />
                          <span>Instagram</span>
                        </div>
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">Connected</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Twitter className="h-5 w-5 text-blue-500" />
                          <span>Twitter</span>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs"
                          onClick={() => {
                            toast.success("Twitter connected successfully!");
                          }}
                        >
                          Connect
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Youtube className="h-5 w-5 text-red-600" />
                          <span>YouTube</span>
                        </div>
                        <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">Connected</span>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => {
                          toast.info("Manage social media connections");
                        }}
                      >
                        Manage All Connections
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Previous Posts</h2>
                    
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Facebook className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium">Product Demo</span>
                        </div>
                        <p className="text-xs text-gray-500">Posted 2 days ago • 1.2K views</p>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Instagram className="h-4 w-4 text-pink-600" />
                          <span className="text-sm font-medium">Behind the Scenes</span>
                        </div>
                        <p className="text-xs text-gray-500">Posted 1 week ago • 3.5K views</p>
                      </div>
                      
                      <Button 
                        className="w-full text-sm" 
                        variant="ghost"
                        onClick={() => {
                          toast.info("View past social media performance");
                        }}
                      >
                        View All Posts
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="website">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-600" />
                      Landing Page Generator
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Page Title</label>
                          <Input 
                            value={pageTitle}
                            onChange={(e) => setPageTitle(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">URL Path</label>
                          <Input 
                            value={urlPath}
                            onChange={(e) => setUrlPath(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Page Template</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>Video Focus</option>
                          <option>Lead Generation</option>
                          <option>Product Showcase</option>
                          <option>Event Registration</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Call to Action</label>
                        <Input defaultValue="Watch Now" />
                      </div>
                      
                      {landingPageGenerated && (
                        <div className="border-t pt-4">
                          <h3 className="font-medium text-green-600 flex items-center gap-2 mb-4">
                            <CheckCircle2 className="h-5 w-5" />
                            Landing Page Generated
                          </h3>
                          
                          <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                            <div className="text-sm text-gray-500 mb-1">Live URL:</div>
                            <div className="flex items-center gap-2">
                              <code className="bg-white border px-3 py-1 rounded-md flex-1">
                                example.com{urlPath}
                              </code>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(`https://example.com${urlPath}`);
                                  toast.success("URL copied to clipboard");
                                }}
                              >
                                <LinkIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <Button 
                              variant="outline"
                              onClick={() => {
                                toast.info("Opening page editor");
                              }}
                            >
                              Edit Page
                            </Button>
                            <Button
                              onClick={() => {
                                toast.info("Opening analytics for this landing page");
                              }}
                            >
                              View Performance
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {!landingPageGenerated && (
                        <Button 
                          className="w-full"
                          onClick={handleGenerateLandingPage}
                          disabled={isGeneratingPage || !pageTitle || !urlPath}
                        >
                          {isGeneratingPage ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              Generate Landing Page
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    
                    <div className="space-y-4">
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={handleCopyShortLink}
                      >
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Copy Short Link
                      </Button>
                      
                      <Button 
                        className="w-full justify-start" 
                        variant="outline"
                        onClick={handleViewLivePage}
                        disabled={!landingPageGenerated}
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        View Live Page
                      </Button>
                      
                      <div className="pt-2 border-t">
                        <h3 className="text-sm font-medium text-gray-500 mb-3">Embed Options</h3>
                        <Button 
                          className="w-full justify-start" 
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText('<iframe src="https://yourvid.io/embed/xyz" width="560" height="315" frameborder="0" allowfullscreen></iframe>');
                            toast.success("Embed code copied to clipboard");
                          }}
                        >
                          Copy Embed Code
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Recent Landing Pages</h2>
                    
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium mb-1">Product Demo Page</h4>
                        <p className="text-xs text-gray-500">Created 3 days ago • 245 visits</p>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium mb-1">Webinar Registration</h4>
                        <p className="text-xs text-gray-500">Created 2 weeks ago • 1,120 visits</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="email">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Email Campaign Creator</h2>
                    <p className="text-gray-500 mb-6">Create email campaigns featuring your videos to engage your audience.</p>
                    
                    <div className="space-y-5">
                      <div className="space-y-3">
                        <h3 className="font-medium">Campaign Details</h3>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Email Subject</label>
                          <Input 
                            placeholder="Enter email subject line"
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Preheader Text</label>
                          <Input 
                            placeholder="Brief preview text shown in inbox"
                            value={emailPreheader}
                            onChange={(e) => setEmailPreheader(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-medium">Video Content</h3>
                        
                        <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                          <div className="aspect-video bg-gray-200 rounded-md mb-3 flex items-center justify-center">
                            <span className="text-gray-500">Video Thumbnail</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium">Product Showcase Video</h4>
                              <p className="text-xs text-gray-500">0:45 • Auto-embedded with play button</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                toast.info("Change selected video");
                              }}
                            >
                              Change
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-medium">Email Body</h3>
                        <Textarea 
                          className="min-h-[120px]"
                          placeholder="Enter email content..."
                          value={emailBody}
                          onChange={(e) => setEmailBody(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex justify-end gap-3">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            toast.info("Email campaign saved as draft");
                          }}
                        >
                          Save Draft
                        </Button>
                        <Button 
                          onClick={handleCreateEmailCampaign}
                          disabled={isPreparingEmail}
                        >
                          {isPreparingEmail ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            "Create Campaign"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Email List</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Main Subscribers</h4>
                          <p className="text-xs text-gray-500">1,245 contacts</p>
                        </div>
                        <input type="checkbox" className="h-4 w-4" checked />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Product Interests</h4>
                          <p className="text-xs text-gray-500">782 contacts</p>
                        </div>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">VIP Customers</h4>
                          <p className="text-xs text-gray-500">128 contacts</p>
                        </div>
                        <input type="checkbox" className="h-4 w-4" />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          toast.info("Import contacts from CSV file");
                        }}
                      >
                        Import Contacts
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Previous Campaigns</h2>
                    
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium mb-1">Summer Sale Announcement</h4>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Sent 2 days ago</span>
                          <span>42% open rate</span>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <h4 className="font-medium mb-1">Product Tutorial Video</h4>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Sent 2 weeks ago</span>
                          <span>38% open rate</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full text-sm" 
                        variant="ghost"
                        onClick={() => {
                          toast.info("View past email campaigns");
                        }}
                      >
                        View All Campaigns
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Publishing Analytics</h2>
                    <p className="text-gray-500">Track performance metrics across all your publishing channels.</p>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <select 
                      className="p-2 border border-gray-300 rounded-md"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                    >
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Custom range</option>
                    </select>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setDateRange("Last 7 days");
                        toast.success("Analytics refreshed");
                      }}
                    >
                      Refresh
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">Total Views</h3>
                    <div className="text-3xl font-bold text-blue-900">12,485</div>
                    <div className="text-sm text-blue-700 mt-1">+18% vs previous period</div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-green-800 mb-2">Engagement Rate</h3>
                    <div className="text-3xl font-bold text-green-900">32%</div>
                    <div className="text-sm text-green-700 mt-1">+5% vs previous period</div>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-purple-800 mb-2">Conversions</h3>
                    <div className="text-3xl font-bold text-purple-900">423</div>
                    <div className="text-sm text-purple-700 mt-1">+12% vs previous period</div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-medium mb-4">Performance by Platform</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Facebook className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium">Facebook</span>
                        <span className="text-sm ml-auto">3,842 views</span>
                      </div>
                      <Progress value={38} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <Instagram className="h-4 w-4 text-pink-600 mr-2" />
                        <span className="text-sm font-medium">Instagram</span>
                        <span className="text-sm ml-auto">5,247 views</span>
                      </div>
                      <Progress value={52} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <Youtube className="h-4 w-4 text-red-600 mr-2" />
                        <span className="text-sm font-medium">YouTube</span>
                        <span className="text-sm ml-auto">2,896 views</span>
                      </div>
                      <Progress value={29} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <Globe className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm font-medium">Website</span>
                        <span className="text-sm ml-auto">1,500 views</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-5">
                    <h3 className="font-medium mb-4">Audience Demographics</h3>
                    <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center mb-4">
                      <span className="text-gray-500">Demographics Chart</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Top Age Group:</div>
                        <div className="font-medium">25-34 (42%)</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Gender Split:</div>
                        <div className="font-medium">54% F / 46% M</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-5">
                    <h3 className="font-medium mb-4">Top Performing Content</h3>
                    <div className="space-y-3">
                      <div className="flex items-center p-2 bg-gray-50 rounded-md">
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-sm">Product Demo Video</div>
                          <div className="text-xs text-gray-500">5.2K views • 48% engagement</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-2 bg-gray-50 rounded-md">
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-sm">Tutorial: Getting Started</div>
                          <div className="text-xs text-gray-500">3.8K views • 62% engagement</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-2 bg-gray-50 rounded-md">
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-sm">Customer Testimonial</div>
                          <div className="text-xs text-gray-500">2.4K views • 38% engagement</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button 
                    onClick={handleViewAnalyticsDashboard}
                    disabled={isLoadingAnalytics}
                  >
                    {isLoadingAnalytics ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Detailed Analytics
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Publishing;
