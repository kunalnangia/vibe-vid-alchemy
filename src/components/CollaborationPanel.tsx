
import React from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const CollaborationPanel: React.FC = () => (
  <div className="bg-white/95 rounded-2xl shadow-lg p-6 border border-blue-100 max-w-xl mx-auto animate-fade-in">
    <h2 className="flex gap-2 items-center text-lg font-bold text-blue-900 mb-3">
      <Users className="w-5 h-5 text-blue-700" />
      Collaboration Tools
    </h2>
    <p className="text-sm text-blue-800 mb-3">
      Edit together in real-time, comment on frames, and share project links.
      <span className="ml-1 font-semibold text-yellow-500">Team & Business Plans</span>
    </p>
    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-5 font-semibold rounded-lg" disabled>
      Invite Collaborators (Coming Soon)
    </Button>
    <div className="mt-3 text-xs text-blue-600">Asynchronous reviews, comment threads, and project history coming soon!</div>
  </div>
);

export default CollaborationPanel;
