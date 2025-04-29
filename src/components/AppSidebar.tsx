
import React from "react";
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Lightbulb, Users, Play } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" className="bg-gray-800 text-white border-none w-[280px]">
      <SidebarContent>
        <div className="mt-4 mb-8 px-4">
          <div className="bg-gray-600 text-white px-6 py-4 rounded-md mb-10">
            <h1 className="text-2xl font-bold">HOM</h1>
          </div>
          
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-gray-700 text-white py-3 mb-2">
                <Lightbulb className="w-6 h-6" />
                <span className="text-lg ml-2">SmartSpark</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-gray-700 text-white py-3 mb-2">
                <Users className="w-6 h-6" />
                <span className="text-lg ml-2">CoCreate</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-gray-700 text-white py-3 mb-2">
                <Play className="w-6 h-6" />
                <span className="text-lg ml-2">ReVibe</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          
          <div className="mt-12 space-y-4">
            <div className="text-2xl font-bold py-2">SmartSprk</div>
            <div className="text-2xl font-bold py-2">CoCreate</div>
            <div className="text-2xl font-bold py-2">LocaleBot</div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
