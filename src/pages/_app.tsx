import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from './theme/themeConfig';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/components/providers/queryClient';
import '@/styles/globals.css';
import Shell from '@/components/Shell/Shell';

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Shell>
        <Component {...pageProps} />
      </Shell>
    </QueryClientProvider>
  </ConfigProvider>
);

export default App;
