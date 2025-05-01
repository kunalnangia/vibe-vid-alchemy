
import { useTokenActions } from './personalization/useTokenActions';
import { useCrmActions } from './personalization/useCrmActions';
import { useLandingPageActions } from './personalization/useLandingPageActions';

interface UsePersonalizationActionsReturn {
  handleInsertToken: () => void;
  handleConnectCRM: () => void;
  handleConnectSalesforce: () => void;
  handlePublishLanding: () => void;
}

export const usePersonalizationActions = (): UsePersonalizationActionsReturn => {
  const tokenActions = useTokenActions();
  const crmActions = useCrmActions();
  const landingPageActions = useLandingPageActions();
  
  return {
    ...tokenActions,
    ...crmActions,
    ...landingPageActions
  };
};
