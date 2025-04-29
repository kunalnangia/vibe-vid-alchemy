
import React from "react";
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Video, Folder, Grid2x2, Settings, Users, Lightbulb, Share2 } from "lucide-react";
import UserProfile from "./UserProfile";
import { useNavigate, useLocation } from "react-router-dom";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <Sidebar variant="sidebar" className="bg-gray-800 text-white border-none w-[280px]">
      <SidebarContent>
        <div className="mt-4 mb-8 px-4">
          <div className="bg-gray-600 text-white px-6 py-4 rounded-md mb-10">
            <h1 className="text-2xl font-bold">VideoVibes</h1>
          </div>
          
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                className={`hover:bg-gray-700 text-white py-3 mb-2 ${location.pathname === '/projects' ? 'bg-gray-700' : ''}`}
                onClick={() => navigate('/projects')}
              >
                <Folder className="w-6 h-6" />
                <span className="text-lg ml-2">My Projects</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton 
                className={`hover:bg-gray-700 text-white py-3 mb-2 ${location.pathname === '/' ? 'bg-gray-700' : ''}`}
                onClick={() => navigate('/')}
              >
                <Video className="w-6 h-6" />
                <span className="text-lg ml-2">Video Editor</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-gray-700 text-white py-3 mb-2">
                <Grid2x2 className="w-6 h-6" />
                <span className="text-lg ml-2">Templates</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-gray-700 text-white py-3 mb-2">
                <Users className="w-6 h-6" />
                <span className="text-lg ml-2">Collaboration</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-gray-700 text-white py-3 mb-2">
                <Lightbulb className="w-6 h-6" />
                <span className="text-lg ml-2">AI Creator</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-gray-700 text-white py-3 mb-2">
                <Share2 className="w-6 h-6" />
                <span className="text-lg ml-2">Publishing</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className="hover:bg-gray-700 text-white py-3 mb-2">
                <Settings className="w-6 h-6" />
                <span className="text-lg ml-2">Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          
          <div className="mt-auto pt-8 border-t border-gray-700">
            <UserProfile />
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
