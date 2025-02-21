import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from './theme/themeConfig';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/components/providers/queryClient';
import '@/styles/globals.css';
import AppShell from '@/components/Shell/AppShell';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </QueryClientProvider>
  </ConfigProvider>
);

export default App;
