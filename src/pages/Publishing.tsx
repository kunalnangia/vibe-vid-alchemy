
import React from 'react';
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Globe, Instagram, Facebook, Twitter, Youtube, ArrowRight, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Publishing = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-6">Publishing</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-purple-700 mb-4">Video Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="Enter video title"
                      defaultValue="Product Demonstration - Spring 2025 Collection"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-md p-2 min-h-[100px]"
                      placeholder="Enter video description"
                      defaultValue="Check out our latest product lineup for Spring 2025. This video showcases our newest features and designs that will be available next season."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Tags</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="Add tags separated by commas"
                      defaultValue="product, demo, 2025, spring, collection"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Thumbnail</label>
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                        Preview
                      </div>
                      <Button variant="outline" size="sm">Upload Thumbnail</Button>
                      <Button variant="outline" size="sm">Generate from Video</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-purple-700 mb-4">Publish To</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Youtube className="h-8 w-8 text-red-600 mr-3" />
                      <div>
                        <p className="font-medium">YouTube</p>
                        <p className="text-xs text-gray-500">Publish to your YouTube channel</p>
                      </div>
                    </div>
                    <Button>Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Instagram className="h-8 w-8 text-pink-600 mr-3" />
                      <div>
                        <p className="font-medium">Instagram</p>
                        <p className="text-xs text-gray-500">Share to Instagram feed or Reels</p>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Connected
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Facebook className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Facebook</p>
                        <p className="text-xs text-gray-500">Share to your Facebook page</p>
                      </div>
                    </div>
                    <Button variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Connected
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Twitter className="h-8 w-8 text-blue-400 mr-3" />
                      <div>
                        <p className="font-medium">Twitter</p>
                        <p className="text-xs text-gray-500">Share to your Twitter profile</p>
                      </div>
                    </div>
                    <Button>Connect</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-purple-700 mb-4">Publish Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Privacy</label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option>Public</option>
                      <option>Private</option>
                      <option>Unlisted</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Schedule</label>
                    <div className="flex gap-2">
                      <select className="flex-1 border border-gray-300 rounded-md p-2">
                        <option>Publish now</option>
                        <option>Schedule for later</option>
                      </select>
                      <input type="date" className="border border-gray-300 rounded-md p-2" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Export Quality</label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option>4K (Ultra HD)</option>
                      <option>1080p (Full HD)</option>
                      <option>720p (HD)</option>
                    </select>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="mb-3 flex justify-between items-center">
                      <span className="text-sm font-medium">Export Progress</span>
                      <span className="text-xs">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <Button className="w-full flex items-center justify-center bg-purple-600">
                    Publish Video
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Publishing;
