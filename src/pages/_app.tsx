import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import theme from './theme/themeConfig';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/components/providers/queryClient';
import '@/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => (
  <ConfigProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>    
  </ConfigProvider>
);

export default App;
