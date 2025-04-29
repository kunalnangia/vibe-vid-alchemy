
import { supabase } from "@/integrations/supabase/client";

// Video operations
export const videoService = {
  getUserVideos: async (userId: string) => {
    return await supabase
      .from("videos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
  },
  
  getVideoById: async (videoId: string) => {
    return await supabase
      .from("videos")
      .select(`
        *,
        video_clips(*),
        text_overlays(*),
        captions(*)
      `)
      .eq("id", videoId)
      .single();
  },
  
  createVideo: async (videoData: any) => {
    return await supabase
      .from("videos")
      .insert(videoData)
      .select()
      .single();
  },
  
  updateVideo: async (videoId: string, videoData: any) => {
    return await supabase
      .from("videos")
      .update(videoData)
      .eq("id", videoId)
      .select()
      .single();
  },
  
  deleteVideo: async (videoId: string) => {
    return await supabase
      .from("videos")
      .delete()
      .eq("id", videoId);
  }
};

// Project operations
export const projectService = {
  getUserProjects: async (userId: string) => {
    return await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
  },
  
  getProjectById: async (projectId: string) => {
    return await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();
  },
  
  createProject: async (projectData: any) => {
    return await supabase
      .from("projects")
      .insert(projectData)
      .select()
      .single();
  },
  
  updateProject: async (projectId: string, projectData: any) => {
    return await supabase
      .from("projects")
      .update(projectData)
      .eq("id", projectId)
      .select()
      .single();
  },
  
  deleteProject: async (projectId: string) => {
    return await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);
  }
};

// Collaboration operations
export const collaborationService = {
  getCollaborators: async (videoId: string) => {
    return await supabase
      .from("collaborators")
      .select(`
        *,
        profiles:user_id (full_name, avatar_url)
      `)
      .eq("video_id", videoId);
  },
  
  addCollaborator: async (videoId: string, userId: string, role: string) => {
    return await supabase
      .from("collaborators")
      .insert({
        video_id: videoId,
        user_id: userId,
        role
      })
      .select()
      .single();
  },
  
  updateCollaboratorRole: async (collaboratorId: string, role: string) => {
    return await supabase
      .from("collaborators")
      .update({ role })
      .eq("id", collaboratorId)
      .select()
      .single();
  },
  
  removeCollaborator: async (collaboratorId: string) => {
    return await supabase
      .from("collaborators")
      .delete()
      .eq("id", collaboratorId);
  }
};

// Comments operations
export const commentService = {
  getVideoComments: async (videoId: string) => {
    return await supabase
      .from("comments")
      .select(`
        *,
        profiles:user_id (full_name, avatar_url)
      `)
      .eq("video_id", videoId)
      .order("created_at", { ascending: true });
  },
  
  addComment: async (videoId: string, userId: string, content: string, timestamp?: number) => {
    return await supabase
      .from("comments")
      .insert({
        video_id: videoId,
        user_id: userId,
        content,
        timestamp
      })
      .select()
      .single();
  },
  
  updateComment: async (commentId: string, content: string) => {
    return await supabase
      .from("comments")
      .update({ content })
      .eq("id", commentId)
      .select()
      .single();
  },
  
  deleteComment: async (commentId: string) => {
    return await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);
  }
};

// AI Processing
export const aiService = {
  processVideo: async (videoId: string, text: string) => {
    return await supabase.functions.invoke('ai-processing', {
      body: { videoId, text },
    });
  }
};

// Email notifications
export const emailService = {
  sendNotification: async (to: string, subject: string, content: string, videoId?: string) => {
    return await supabase.functions.invoke('send-email', {
      body: { to, subject, content, videoId },
    });
  }
};

// Scheduled tasks
export const scheduledTasksService = {
  runTask: async (task: string) => {
    return await supabase.functions.invoke('scheduled-tasks', {
      body: { task },
    });
  }
};
