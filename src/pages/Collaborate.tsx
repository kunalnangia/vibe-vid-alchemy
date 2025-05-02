
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Clock, UserPlus, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface CollaboratorProps {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

interface CommentProps {
  id: string;
  author: string;
  avatarUrl?: string;
  content: string;
  timestamp: string;
  replies?: CommentProps[];
}

const Collaborate: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [selectedTab, setSelectedTab] = useState("team");
  
  // Mock data for collaborators
  const [collaborators, setCollaborators] = useState<CollaboratorProps[]>([
    { id: "1", name: "Alex Johnson", email: "alex@example.com", role: "Owner", avatarUrl: "https://i.pravatar.cc/150?img=1" },
    { id: "2", name: "Sarah Miller", email: "sarah@example.com", role: "Editor", avatarUrl: "https://i.pravatar.cc/150?img=5" },
    { id: "3", name: "Michael Chen", email: "michael@example.com", role: "Viewer", avatarUrl: "https://i.pravatar.cc/150?img=8" }
  ]);
  
  // Mock data for comments
  const [comments, setComments] = useState<CommentProps[]>([
    {
      id: "1",
      author: "Alex Johnson",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
      content: "I think we should add more b-roll footage to make the transitions smoother.",
      timestamp: "2 hours ago",
      replies: [
        {
          id: "4",
          author: "Sarah Miller",
          avatarUrl: "https://i.pravatar.cc/150?img=5",
          content: "Good idea. I'll work on finding some additional footage.",
          timestamp: "1 hour ago"
        }
      ]
    },
    {
      id: "2",
      author: "Michael Chen",
      avatarUrl: "https://i.pravatar.cc/150?img=8",
      content: "The audio levels could use some adjustment around the 1:45 mark.",
      timestamp: "Yesterday"
    }
  ]);
  
  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Check if already invited
    if (collaborators.some(c => c.email === email)) {
      toast.error("This person is already a collaborator");
      return;
    }
    
    // Add new collaborator (in a real app, this would send an invitation)
    const newCollaborator: CollaboratorProps = {
      id: `${collaborators.length + 1}`,
      name: email.split('@')[0],
      email: email,
      role: "Viewer"
    };
    
    setCollaborators([...collaborators, newCollaborator]);
    toast.success(`Invitation sent to ${email}`);
    setEmail("");
  };
  
  const handleRemoveCollaborator = (id: string) => {
    // Don't allow removing the owner
    const collaborator = collaborators.find(c => c.id === id);
    if (collaborator && collaborator.role === "Owner") {
      toast.error("Cannot remove the owner");
      return;
    }
    
    setCollaborators(collaborators.filter(c => c.id !== id));
    toast.success("Collaborator removed");
  };
  
  const handleChangeRole = (id: string, newRole: string) => {
    setCollaborators(collaborators.map(c => 
      c.id === id ? { ...c, role: newRole } : c
    ));
    toast.success("Role updated");
  };
  
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    
    // Add new comment
    const newComment: CommentProps = {
      id: `${comments.length + 10}`,
      author: "You",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
      content: message,
      timestamp: "Just now"
    };
    
    setComments([...comments, newComment]);
    toast.success("Comment added");
    setMessage("");
  };
  
  const handleCopyLink = () => {
    // In a real app, this would copy a collaboration link
    navigator.clipboard.writeText("https://videoapp.com/collaborate/project-123");
    setLinkCopied(true);
    toast.success("Collaboration link copied to clipboard");
    
    setTimeout(() => setLinkCopied(false), 3000);
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
        <AppSidebar />
        
        <div className="flex-1 p-6 space-y-6">
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-purple-900">Collaboration Center</h1>
              <p className="text-purple-700">Work together on your projects</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={handleCopyLink}
                className="flex items-center gap-1"
              >
                {linkCopied ? <Check size={16} /> : <Copy size={16} />}
                {linkCopied ? "Copied!" : "Copy Sharing Link"}
              </Button>
              
              <Button className="bg-purple-600 hover:bg-purple-700">
                <UserPlus size={16} className="mr-2" />
                Invite People
              </Button>
            </div>
          </header>
          
          <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="team">
                <Users size={16} className="mr-2" />
                Team
              </TabsTrigger>
              <TabsTrigger value="comments">
                <MessageSquare size={16} className="mr-2" />
                Comments
              </TabsTrigger>
              <TabsTrigger value="history">
                <Clock size={16} className="mr-2" />
                History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="team" className="space-y-4 mt-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Project Collaborators</h3>
                
                <form onSubmit={handleInvite} className="flex gap-2 mb-6">
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Invite</Button>
                </form>
                
                <div className="space-y-3">
                  {collaborators.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden">
                          {person.avatarUrl ? (
                            <img src={person.avatarUrl} alt={person.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="font-medium text-purple-700">{person.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{person.name}</div>
                          <div className="text-sm text-gray-500">{person.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={person.role}
                          onChange={(e) => handleChangeRole(person.id, e.target.value)}
                          className="text-sm border rounded px-2 py-1"
                          disabled={person.role === "Owner"}
                        >
                          <option value="Owner">Owner</option>
                          <option value="Editor">Editor</option>
                          <option value="Viewer">Viewer</option>
                        </select>
                        
                        {person.role !== "Owner" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRemoveCollaborator(person.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Permission Levels</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                    <span><strong>Owner:</strong> Full access to edit, share, and manage collaborators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span><strong>Editor:</strong> Can edit the project but cannot add/remove people</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span><strong>Viewer:</strong> Can view and comment but cannot edit</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="comments" className="space-y-4 mt-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Discussion</h3>
                
                <div className="space-y-6 mb-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex-shrink-0 overflow-hidden">
                          {comment.avatarUrl ? (
                            <img src={comment.avatarUrl} alt={comment.author} className="w-full h-full object-cover" />
                          ) : (
                            <span className="flex items-center justify-center h-full font-medium text-purple-700">
                              {comment.author.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between">
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="mt-1 text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                      
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-12 space-y-4 pl-4 border-l-2 border-gray-100">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex-shrink-0 overflow-hidden">
                                {reply.avatarUrl ? (
                                  <img src={reply.avatarUrl} alt={reply.author} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="flex items-center justify-center h-full font-medium text-purple-700">
                                    {reply.author.charAt(0)}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-baseline justify-between">
                                  <span className="font-medium">{reply.author}</span>
                                  <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                </div>
                                <p className="mt-1 text-gray-700">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <form onSubmit={handleAddComment} className="mt-6">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex-shrink-0 overflow-hidden">
                      <span className="flex items-center justify-center h-full font-medium text-purple-700">
                        Y
                      </span>
                    </div>
                    <div className="flex-1">
                      <Input
                        placeholder="Add a comment..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mb-2"
                      />
                      <Button type="submit" size="sm">Comment</Button>
                    </div>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4 mt-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Project History</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium">Project created</div>
                      <div className="text-sm text-gray-500">Today, 3:45 PM by Alex Johnson</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                      <span className="text-blue-600 text-xs">+</span>
                    </div>
                    <div>
                      <div className="font-medium">Sarah Miller added as collaborator</div>
                      <div className="text-sm text-gray-500">Today, 2:30 PM by Alex Johnson</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mt-1">
                      <span className="text-purple-600 text-xs">✏</span>
                    </div>
                    <div>
                      <div className="font-medium">Video edited</div>
                      <div className="text-sm text-gray-500">Yesterday, 4:12 PM by Sarah Miller</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                      <span className="text-blue-600 text-xs">+</span>
                    </div>
                    <div>
                      <div className="font-medium">Michael Chen added as collaborator</div>
                      <div className="text-sm text-gray-500">Yesterday, 11:05 AM by Alex Johnson</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mt-1">
                      <span className="text-yellow-600 text-xs">↑</span>
                    </div>
                    <div>
                      <div className="font-medium">Initial footage uploaded</div>
                      <div className="text-sm text-gray-500">Monday, 9:23 AM by Alex Johnson</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Collaborate;
