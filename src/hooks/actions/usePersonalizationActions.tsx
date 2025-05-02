
import { useState } from 'react';
import { toast } from 'sonner';

export const usePersonalizationActions = () => {
  const [crmConnected, setCrmConnected] = useState(false);
  const [salesforceConnected, setSalesforceConnected] = useState(false);
  
  // Handle insert token
  const handleInsertToken = () => {
    toast.info('Insert Token panel opened', {
      description: 'Add personalization tokens to your video'
    });
    
    // Simulate token insertion menu
    setTimeout(() => {
      toast('Available tokens:', {
        description: '{{first_name}}, {{company}}, {{email}}, {{custom_field}}',
        duration: 5000
      });
    }, 500);
  };
  
  // Handle connect CRM
  const handleConnectCRM = () => {
    toast.info('Connecting to CRM...', {
      description: 'Choose your CRM provider to connect'
    });
    
    setTimeout(() => {
      // Show a simulated CRM connection dialog
      const crmTypes = ['HubSpot', 'Mailchimp', 'ActiveCampaign', 'Zoho CRM'];
      const randomCRM = crmTypes[Math.floor(Math.random() * crmTypes.length)];
      
      toast.success(`${randomCRM} CRM connected`, {
        description: `You can now use ${randomCRM} data in your videos`,
        duration: 5000
      });
      
      setCrmConnected(true);
    }, 2000);
  };
  
  // Handle connect Salesforce
  const handleConnectSalesforce = () => {
    toast.info('Connecting to Salesforce...', {
      description: 'Sign in to your Salesforce account'
    });
    
    setTimeout(() => {
      // Show a simulated Salesforce authentication flow
      toast('Salesforce authentication required', {
        description: 'Enter your credentials to continue',
        duration: 3000
      });
      
      setTimeout(() => {
        toast.success('Salesforce connected successfully', {
          description: 'You can now use Salesforce data in your videos',
          duration: 5000
        });
        
        setSalesforceConnected(true);
      }, 3000);
    }, 2000);
  };
  
  // Handle publish landing page
  const handlePublishLanding = () => {
    toast.info('Preparing video for landing page...', {
      description: 'This may take a moment'
    });
    
    setTimeout(() => {
      // Simulate landing page creation process
      toast('Landing page draft created', {
        description: 'Customizing layout based on video content',
        duration: 3000
      });
      
      setTimeout(() => {
        toast.success('Landing page published!', {
          description: 'Your landing page is now live at demo-page.example.com',
          duration: 5000
        });
        
        // Offer to share the landing page URL
        setTimeout(() => {
          toast('Share your landing page', {
            description: 'Copy the URL or share directly to social media',
            duration: 5000
          });
        }, 2000);
      }, 3000);
    }, 3000);
  };

  return {
    crmConnected,
    salesforceConnected,
    handleInsertToken,
    handleConnectCRM,
    handleConnectSalesforce,
    handlePublishLanding
  };
};

export default usePersonalizationActions;
