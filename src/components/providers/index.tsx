import LocationsProvider from '@/store/locations/provider';
import SettingsProvider from '@/store/settings/provider';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import ThemeProvider from './ThemeProvider';

const queryClient = new QueryClient();

interface GlobalProvidersProps {}

const GlobalProviders: React.FC<GlobalProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <LocationsProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </LocationsProvider>
      </SettingsProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default GlobalProviders;
