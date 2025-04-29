
import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Plus, Video, Search, Filter, Grid2x2, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Projects = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock projects data
  const [projects, setProjects] = useState([
    {
      id: '1',
      title: 'Product Demo Video',
      description: 'Demo of our latest product features',
      thumbnail: 'https://via.placeholder.com/300x200?text=Product+Demo',
      lastEdited: '2025-04-25',
      status: 'published'
    },
    {
      id: '2',
      title: 'Marketing Campaign',
      description: 'Q4 marketing campaign video',
      thumbnail: 'https://via.placeholder.com/300x200?text=Marketing',
      lastEdited: '2025-04-20',
      status: 'draft'
    },
    {
      id: '3',
      title: 'Customer Testimonial',
      description: 'Interview with our best customer',
      thumbnail: 'https://via.placeholder.com/300x200?text=Testimonial',
      lastEdited: '2025-04-15',
      status: 'processing'
    }
  ]);
  
  const handleCreateProject = () => {
    toast.success("Creating new video project");
    navigate('/');
  };
  
  const handleEditProject = (id: string) => {
    toast.info(`Opening project ${id}`);
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">My Video Projects</h1>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 px-5" 
              onClick={handleCreateProject}
            >
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                
                <div className="flex bg-gray-100 rounded-md p-1">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    className={`px-2 ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid2x2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    className={`px-2 ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                  <div 
                    key={project.id} 
                    className="border border-blue-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleEditProject(project.id)}
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-blue-700 text-white text-xs px-2 py-1 rounded">
                        {project.status}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg text-blue-900">{project.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                        <span>Last edited: {project.lastEdited}</span>
                        <div className="flex items-center">
                          <Video className="w-3 h-3 mr-1" />
                          <span>Video</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map(project => (
                  <div 
                    key={project.id} 
                    className="flex border border-blue-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleEditProject(project.id)}
                  >
                    <div className="w-48 h-28 bg-gray-200">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-lg text-blue-900">{project.title}</h3>
                        <div className="bg-blue-700 text-white text-xs px-2 py-1 rounded">
                          {project.status}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                        <span>Last edited: {project.lastEdited}</span>
                        <div className="flex items-center">
                          <Video className="w-3 h-3 mr-1" />
                          <span>Video</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
