
import React from 'react';
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Share2, Facebook, Instagram, Twitter, Youtube, Globe, Link, ArrowRight } from "lucide-react";

const Publishing = () => {
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
                        <textarea
                          className="w-full border border-gray-300 rounded-md p-3 min-h-[120px]"
                          placeholder="Write an engaging caption for your post..."
                          defaultValue="Check out our new product release! 🚀 We've been working on this for months and can't wait to hear your feedback. #NewRelease #ProductLaunch"
                        />
                      </div>
                      
                      {/* Tags */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Tags</label>
                        <Input
                          placeholder="Add tags separated by commas"
                          defaultValue="product, launch, video, showcase"
                        />
                      </div>
                      
                      {/* Platform specific options */}
                      <div className="space-y-3">
                        <h3 className="font-medium">Platform Options</h3>
                        
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center gap-2 border rounded-full px-4 py-2 bg-blue-50">
                            <Facebook className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">Facebook</span>
                          </div>
                          <div className="flex items-center gap-2 border rounded-full px-4 py-2 bg-pink-50">
                            <Instagram className="h-4 w-4 text-pink-600" />
                            <span className="text-sm">Instagram</span>
                          </div>
                          <div className="flex items-center gap-2 border rounded-full px-4 py-2 bg-blue-50">
                            <Twitter className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">Twitter</span>
                          </div>
                          <div className="flex items-center gap-2 border rounded-full px-4 py-2 bg-red-50">
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
                            defaultValue={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Publish Time</label>
                          <Input
                            type="time"
                            defaultValue="12:00"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3">
                        <Button variant="outline">
                          Save Draft
                        </Button>
                        <Button onClick={() => toast.success("Post scheduled successfully!")}>
                          Schedule Post
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
                        <Button size="sm" variant="outline" className="text-xs">
                          Connect
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Youtube className="h-5 w-5 text-red-600" />
                          <span>YouTube</span>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          Connect
                        </Button>
                      </div>
                      
                      <Button className="w-full" variant="outline">
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
                      
                      <Button className="w-full text-sm" variant="ghost">
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
                          <Input defaultValue="Product Launch - Special Offer" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">URL Path</label>
                          <Input defaultValue="/product-launch" />
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={() => toast.success("Landing page generated! Preview ready.")}>
                        Generate Landing Page
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    
                    <div className="space-y-4">
                      <Button className="w-full justify-start" variant="outline">
                        <Link className="h-4 w-4 mr-2" />
                        Copy Short Link
                      </Button>
                      
                      <Button className="w-full justify-start" variant="outline">
                        <Globe className="h-4 w-4 mr-2" />
                        View Live Page
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="email">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-6">Email Campaign Creator</h2>
                <p className="text-gray-500 mb-6">Create email campaigns featuring your videos to engage your audience.</p>
                
                <Button onClick={() => toast.info("Email campaign feature coming soon!")}>
                  Create New Email Campaign
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-6">Publishing Analytics</h2>
                <p className="text-gray-500 mb-6">Track performance metrics across all your publishing channels.</p>
                
                <Button onClick={() => toast.info("Analytics dashboard coming soon!")}>
                  View Analytics Dashboard
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Publishing;
