
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar, SidebarItem } from "@/components/ui/sidebar";
import { 
  Home, Video, Users, Settings, FileText, PanelLeft, 
  Layers, Upload, Templates, Share2, MessageSquare, 
  Database, BarChart
} from 'lucide-react';

export function AppSidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <Sidebar>
      <div className="flex flex-col h-full">
        <div className="py-4 px-2">
          <h2 className="text-xl font-bold text-center mb-6 text-blue-600">
            VideoVibe
          </h2>
          
          <nav className="space-y-1">
            <SidebarItem 
              icon={<Home className="h-5 w-5" />} 
              title="Dashboard" 
              isActive={isActive('/')} 
              href="/"
              as={Link}
            />
            
            <SidebarItem 
              icon={<Video className="h-5 w-5" />} 
              title="Editor" 
              isActive={isActive('/video-demo')} 
              href="/video-demo"
              as={Link}
            />
            
            <SidebarItem 
              icon={<FileText className="h-5 w-5" />} 
              title="Scripts" 
              isActive={isActive('/scripts')} 
              href="/scripts"
              as={Link}
            />
            
            <SidebarItem 
              icon={<Layers className="h-5 w-5" />} 
              title="Projects" 
              isActive={isActive('/projects')} 
              href="/projects"
              as={Link}
            />
            
            <SidebarItem 
              icon={<Upload className="h-5 w-5" />} 
              title="Media" 
              isActive={isActive('/media')} 
              href="/media"
              as={Link}
            />
            
            <SidebarItem 
              icon={<Templates className="h-5 w-5" />} 
              title="Templates" 
              isActive={isActive('/templates')} 
              href="/templates"
              as={Link}
            />
            
            <SidebarItem 
              icon={<Share2 className="h-5 w-5" />} 
              title="Publishing" 
              isActive={isActive('/publishing')} 
              href="/publishing"
              as={Link}
            />
            
            <SidebarItem 
              icon={<Database className="h-5 w-5" />} 
              title="PLM" 
              isActive={isActive('/plm')} 
              href="/plm"
              as={Link}
            />
          </nav>
        </div>
        
        <div className="mt-auto pb-6 px-2">
          <nav className="space-y-1">
            <SidebarItem 
              icon={<Users className="h-5 w-5" />} 
              title="Team" 
              isActive={isActive('/team')} 
              href="/team"
              as={Link}
            />
            
            <SidebarItem 
              icon={<MessageSquare className="h-5 w-5" />} 
              title="Support" 
              isActive={isActive('/support')} 
              href="/support"
              as={Link}
            />
            
            <SidebarItem 
              icon={<BarChart className="h-5 w-5" />} 
              title="Analytics" 
              isActive={isActive('/analytics')} 
              href="/analytics"
              as={Link}
            />
            
            <SidebarItem 
              icon={<Settings className="h-5 w-5" />} 
              title="Settings" 
              isActive={isActive('/settings')} 
              href="/settings"
              as={Link}
            />
          </nav>
        </div>
      </div>
    </Sidebar>
  );
}

export default AppSidebar;
