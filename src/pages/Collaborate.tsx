
import React from 'react';
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, MessageSquare, Share } from "lucide-react";

const Collaborate = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-6">Collaborate</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-purple-700 flex items-center mb-4">
                <Users className="mr-2 h-5 w-5" />
                Team Members
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <img src="https://i.pravatar.cc/100?img=1" alt="User" className="h-10 w-10 rounded-full mr-3" />
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Editor</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Online</span>
                </div>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-center">
                    <img src="https://i.pravatar.cc/100?img=2" alt="User" className="h-10 w-10 rounded-full mr-3" />
                    <div>
                      <p className="font-medium">Michael Smith</p>
                      <p className="text-sm text-gray-500">Designer</p>
                    </div>
                  </div>
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Offline</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img src="https://i.pravatar.cc/100?img=3" alt="User" className="h-10 w-10 rounded-full mr-3" />
                    <div>
                      <p className="font-medium">Emily Davis</p>
                      <p className="text-sm text-gray-500">Content Creator</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Online</span>
                </div>
                
                <Button variant="outline" className="w-full flex items-center justify-center mt-4">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite New Member
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-purple-700 flex items-center mb-4">
                <MessageSquare className="mr-2 h-5 w-5" />
                Comments
              </h2>
              
              <div className="space-y-4 max-h-80 overflow-y-auto">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <img src="https://i.pravatar.cc/100?img=1" alt="User" className="h-6 w-6 rounded-full mr-2" />
                    <p className="font-medium text-sm">Sarah Johnson</p>
                    <span className="text-xs text-gray-500 ml-auto">10:30 AM</span>
                  </div>
                  <p className="text-sm">I think we should adjust the timing on the intro sequence. It feels a bit rushed.</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <img src="https://i.pravatar.cc/100?img=3" alt="User" className="h-6 w-6 rounded-full mr-2" />
                    <p className="font-medium text-sm">Emily Davis</p>
                    <span className="text-xs text-gray-500 ml-auto">11:15 AM</span>
                  </div>
                  <p className="text-sm">I've uploaded new footage for the middle section. Let me know what you think!</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-3 border-l-4 border-purple-500">
                  <div className="flex items-center mb-2">
                    <img src="https://i.pravatar.cc/100?img=12" alt="User" className="h-6 w-6 rounded-full mr-2" />
                    <p className="font-medium text-sm">You</p>
                    <span className="text-xs text-gray-500 ml-auto">12:05 PM</span>
                  </div>
                  <p className="text-sm">The color grading looks great! I've added some notes on the audio levels in the third segment.</p>
                </div>
              </div>
              
              <div className="mt-4 relative">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="w-full border rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="absolute right-3 top-2 text-purple-600">
                  <Share className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Collaborate;
