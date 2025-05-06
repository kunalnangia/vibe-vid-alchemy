
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { 
  Home, 
  Video, 
  Layout, 
  Wand2, 
  Share2, 
  Settings,
  Users,
  TrendingUp
} from 'lucide-react';

export function AppSidebar() {
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Projects', href: '/projects', icon: Video },
    { name: 'Templates', href: '/templates', icon: Layout },
    { name: 'AI Workspace', href: '/ai-creator', icon: Wand2 },
    { name: 'PLM', href: '/plm', icon: TrendingUp },
    { name: 'Collaborate', href: '/collaborate', icon: Users },
    { name: 'Publishing', href: '/publishing', icon: Share2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <Sidebar>
      <div className="flex flex-col h-full py-4 bg-purple-800 text-white">
        <div className="px-4 mb-6">
          <h2 className="text-xl font-bold">VideoVibes</h2>
          <p className="text-sm text-purple-200">Video Editor Pro</p>
        </div>
        
        <SidebarContent className="flex-1">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => 
                  isActive
                    ? 'flex items-center px-2 py-2 text-base font-medium rounded-md bg-purple-700 text-white'
                    : 'flex items-center px-2 py-2 text-base font-medium rounded-md text-purple-100 hover:bg-purple-700 hover:text-white'
                }
              >
                {({isActive}) => (
                  <>
                    <item.icon 
                      className={`mr-3 h-6 w-6 ${isActive ? 'text-white' : 'text-purple-300'}`} 
                      aria-hidden="true" 
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </SidebarContent>
        
        <div className="px-4 py-4 border-t border-purple-700">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src="https://i.pravatar.cc/100?img=12"
                alt="User avatar"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">John Smith</p>
              <p className="text-xs text-purple-300">Pro Account</p>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
