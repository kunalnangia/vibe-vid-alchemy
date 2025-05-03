import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Auth from '../Auth';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act } from 'react-dom/test-utils';

// Create a new QueryClient for testing
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Test wrapper component
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {children}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Auth Component', () => {
  it('renders login form by default', () => {
    render(
      <TestWrapper>
        <Auth />
      </TestWrapper>
    );

    expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('switches between login and register forms', async () => {
    render(
      <TestWrapper>
        <Auth />
      </TestWrapper>
    );

    const signUpTab = screen.getByRole('tab', { name: /Sign Up/i });
    await act(async () => {
      fireEvent.click(signUpTab);
    });

    await waitFor(() => {
      expect(screen.getByRole('tab', { name: /Sign Up/i, selected: true })).toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    render(
      <TestWrapper>
        <Auth />
      </TestWrapper>
    );

    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Since we're using HTML5 validation, we should check for validity state
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });
}); 