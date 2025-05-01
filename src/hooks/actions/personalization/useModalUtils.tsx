
import { ReactNode } from 'react';

interface ModalOptions {
  title: string;
  content: ReactNode | string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

// This utility could be expanded later for more reusable modal functionality
export const useModalUtils = () => {
  // For future shared modal functionality across personalization features
  return {
    // Placeholder for future modal utils
  };
};
