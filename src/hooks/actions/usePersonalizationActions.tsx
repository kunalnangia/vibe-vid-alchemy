
import { useState } from 'react';
import { toast } from 'sonner';

export const usePersonalizationActions = () => {
  // Handle insert token
  const handleInsertToken = () => {
    toast.info('Insert Token panel opened', {
      description: 'Add personalization tokens to your video'
    });
  };
  
  // Handle connect CRM
  const handleConnectCRM = () => {
    toast.info('Connecting to CRM...', {
      description: 'Choose your CRM provider to connect'
    });
    
    setTimeout(() => {
      toast.success('Demo CRM connected', {
        description: 'You can now use CRM data in your videos'
      });
    }, 2000);
  };
  
  // Handle connect Salesforce
  const handleConnectSalesforce = () => {
    toast.info('Connecting to Salesforce...', {
      description: 'Sign in to your Salesforce account'
    });
    
    setTimeout(() => {
      toast.success('Demo Salesforce connected', {
        description: 'You can now use Salesforce data in your videos'
      });
    }, 2000);
  };
  
  // Handle publish landing page
  const handlePublishLanding = () => {
    toast.info('Preparing video for landing page...', {
      description: 'This may take a moment'
    });
    
    setTimeout(() => {
      toast.success('Landing page created', {
        description: 'Your video is now published and ready to share'
      });
    }, 3000);
  };

  return {
    handleInsertToken,
    handleConnectCRM,
    handleConnectSalesforce,
    handlePublishLanding
  };
};

export default usePersonalizationActions;
