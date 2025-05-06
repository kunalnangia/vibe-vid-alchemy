
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  Home, Video, Users, Settings, FileText, PanelLeft, 
  Layers, Upload, FileBox, Share2, MessageSquare, 
  Database, BarChart
} from 'lucide-react';

export function AppSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <Sidebar className="studio-sidebar">
      <div className="flex flex-col h-full">
        <div className="py-4 px-2">
          <h2 className="text-xl font-bold text-center mb-6 text-white">
            VideoVibe
          </h2>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/')} 
                  asChild
                  className="side-menu-item"
                >
                  <Link to="/">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/video-demo')} 
                  asChild
                  className="side-menu-item"
                >
                  <Link to="/video-demo">
                    <Video className="h-5 w-5" />
                    <span>Editor</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/scripts')} 
                  asChild
                  className="side-menu-item"
                >
                  <Link to="/scripts">
                    <FileText className="h-5 w-5" />
                    <span>Scripts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/projects')} 
                  asChild
                >
                  <Link to="/projects">
                    <Layers className="h-5 w-5" />
                    <span>Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/media')} 
                  asChild
                >
                  <Link to="/media">
                    <Upload className="h-5 w-5" />
                    <span>Media</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/templates')} 
                  asChild
                >
                  <Link to="/templates">
                    <FileBox className="h-5 w-5" />
                    <span>Templates</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/publishing')} 
                  asChild
                >
                  <Link to="/publishing">
                    <Share2 className="h-5 w-5" />
                    <span>Publishing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/plm')} 
                  asChild
                >
                  <Link to="/plm">
                    <Database className="h-5 w-5" />
                    <span>PLM</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </div>
        
        <div className="mt-auto pb-6 px-2">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/team')} 
                  asChild
                >
                  <Link to="/team">
                    <Users className="h-5 w-5" />
                    <span>Team</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/support')} 
                  asChild
                >
                  <Link to="/support">
                    <MessageSquare className="h-5 w-5" />
                    <span>Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/analytics')} 
                  asChild
                >
                  <Link to="/analytics">
                    <BarChart className="h-5 w-5" />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActive('/settings')} 
                  asChild
                >
                  <Link to="/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </div>
      </div>
    </Sidebar>
  );
}

export default AppSidebar;
