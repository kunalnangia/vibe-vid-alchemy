
import { toast } from 'sonner';

interface ApiCallOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  headers?: Record<string, string>;
  showLoadingToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
}

// Base URL for API calls
const API_BASE_URL = 'https://api.example.com';

// Generic API call function
export const apiCall = async <T>({
  endpoint,
  method = 'GET',
  data = null,
  headers = {},
  showLoadingToast = false,
  showSuccessToast = false,
  successMessage = 'Operation completed successfully'
}: ApiCallOptions): Promise<T> => {
  
  let toastId;
  
  if (showLoadingToast) {
    toastId = toast.loading('Processing request...');
  }
  
  try {
    // In a production environment, this would be a real API call
    // For now, we'll simulate responses
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate different responses based on endpoint
    let response: any;
    
    if (endpoint.includes('/videos')) {
      response = {
        success: true,
        data: {
          videos: [
            { id: 'v1', title: 'Product Demo', duration: 124, views: 1240 },
            { id: 'v2', title: 'Tutorial', duration: 256, views: 852 }
          ]
        }
      };
    } else if (endpoint.includes('/analytics')) {
      response = {
        success: true,
        data: {
          totalViews: 10245,
          avgWatchTime: 168,
          topPerformers: [
            { id: 'v1', title: 'Product Demo', views: 1240 },
            { id: 'v3', title: 'Customer Story', views: 987 }
          ]
        }
      };
    } else {
      response = { success: true, data: { message: 'Operation successful' } };
    }
    
    if (showLoadingToast) {
      toast.dismiss(toastId);
    }
    
    if (showSuccessToast) {
      toast.success(successMessage);
    }
    
    return response.data as T;
  } catch (error) {
    if (showLoadingToast) {
      toast.dismiss(toastId);
    }
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    toast.error(`API Error: ${errorMessage}`);
    throw error;
  }
};

// Video-specific API functions
export const fetchVideos = async () => {
  return apiCall<{videos: any[]}>({
    endpoint: '/videos',
    showLoadingToast: true
  });
};

export const getVideoAnalytics = async (videoId: string) => {
  return apiCall<{views: number, engagement: number}>({
    endpoint: `/analytics/videos/${videoId}`,
    showLoadingToast: true
  });
};

// User-specific API functions
export const fetchUserProfile = async () => {
  return apiCall<{name: string, email: string, preferences: any}>({
    endpoint: '/user/profile',
    showLoadingToast: true
  });
};

// CRUD operations for database integration
export const createRecord = async <T>(collection: string, data: any) => {
  return apiCall<T>({
    endpoint: `/${collection}`,
    method: 'POST',
    data,
    showLoadingToast: true,
    showSuccessToast: true,
    successMessage: 'Record created successfully'
  });
};

export const updateRecord = async <T>(collection: string, id: string, data: any) => {
  return apiCall<T>({
    endpoint: `/${collection}/${id}`,
    method: 'PUT',
    data,
    showLoadingToast: true,
    showSuccessToast: true,
    successMessage: 'Record updated successfully'
  });
};

export const deleteRecord = async (collection: string, id: string) => {
  return apiCall<{success: boolean}>({
    endpoint: `/${collection}/${id}`,
    method: 'DELETE',
    showLoadingToast: true,
    showSuccessToast: true,
    successMessage: 'Record deleted successfully'
  });
};

export default {
  fetchVideos,
  getVideoAnalytics,
  fetchUserProfile,
  createRecord,
  updateRecord,
  deleteRecord
};
