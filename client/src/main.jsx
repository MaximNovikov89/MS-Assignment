import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';

// Instantiate the global, secure async engine cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Ensures failed slot requests don't infinite-loop on error
      refetchOnWindowFocus: false
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);