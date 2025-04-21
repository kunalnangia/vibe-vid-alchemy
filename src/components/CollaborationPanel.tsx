
import React, { useState } from "react";
import { Users, Copy, Check, Mail, Plus, UserPlus, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CollaborationPanel: React.FC = () => {
  const [email, setEmail] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [collaborators, setCollaborators] = useState([
    { name: "Alex Johnson", email: "alex@example.com", role: "Owner" },
    { name: "Sarah Miller", email: "sarah@example.com", role: "Editor" }
  ]);
  
  const handleCopyLink = () => {
    // In a real app, this would copy an actual collaboration link
    navigator.clipboard.writeText("https://videovibescraft.com/project/12345?share=view");
    setLinkCopied(true);
    toast.success("Collaboration link copied to clipboard");
    
    setTimeout(() => setLinkCopied(false), 3000);
  };
  
  const handleAddCollaborator = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    if (collaborators.some(c => c.email === email)) {
      toast.error("This person is already a collaborator");
      return;
    }
    
    // In a real app, this would send an invitation email
    toast.success(`Invitation sent to ${email}`);
    
    // Simulate adding new collaborator
    setCollaborators([...collaborators, {
      name: email.split('@')[0],
      email,
      role: "Viewer"
    }]);
    
    setEmail("");
  };
  
  const handleRemoveCollaborator = (email: string) => {
    setCollaborators(collaborators.filter(c => c.email !== email));
    toast.success("Collaborator removed");
  };

  return (
    <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
      <h2 className="flex gap-2 items-center text-lg font-bold text-blue-900 mb-3">
        <Users className="w-5 h-5 text-blue-700" />
        Collaboration Tools
      </h2>
      
      <div className="mb-4">
        <p className="text-sm text-blue-800 mb-3">
          Share your project with team members and clients for real-time collaboration.
        </p>
        
        <div className="flex gap-2">
          <Button 
            className="flex items-center gap-1"
            onClick={handleCopyLink}
          >
            {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {linkCopied ? "Copied!" : "Copy Sharing Link"}
          </Button>
          
          <Button variant="outline">
            Set Permissions
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Invite Collaborators</h3>
        
        <form onSubmit={handleAddCollaborator} className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">
            <UserPlus className="w-4 h-4 mr-1" />
            Invite
          </Button>
        </form>
        
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {collaborators.map((person, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-blue-50 rounded">
              <div className="flex items-center gap-2">
                <div className="bg-blue-200 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center uppercase font-medium">
                  {person.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium flex items-center gap-1">
                    {person.name}
                    {person.role === "Owner" && (
                      <Crown className="h-3 w-3 text-yellow-500" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{person.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  {person.role}
                </div>
                {person.role !== "Owner" && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                    onClick={() => handleRemoveCollaborator(person.email)}
                  >
                    ✕
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-3 text-xs text-blue-600 space-y-2">
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          Comments and feedback are synchronized in real-time
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
          Version history tracks all changes
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-yellow-500"></span>
          Approval workflow available with Business Plan
        </div>
      </div>
    </div>
  );
};

export default CollaborationPanel;
