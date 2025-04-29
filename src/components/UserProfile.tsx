
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
          
        if (error) {
          console.error("Error fetching profile:", error);
          toast.error("Failed to load user profile");
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-gray-300 animate-pulse"></div>
        <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const initials = profile.full_name 
    ? profile.full_name.split(' ').map(name => name[0]).join('')
    : user.email?.substring(0, 2);

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        {profile.avatar_url ? (
          <AvatarImage src={profile.avatar_url} alt={profile.full_name || "User"} />
        ) : (
          <AvatarFallback className="bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      <div className="text-sm font-medium">
        {profile.full_name || user.email?.split('@')[0]}
      </div>
      <Button variant="ghost" size="sm" onClick={signOut}>
        Sign out
      </Button>
    </div>
  );
};

export default UserProfile;
