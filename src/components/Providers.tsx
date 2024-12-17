// src/components/Providers.tsx
'use client'

import { PropsWithChildren } from 'react'
import '../i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function I18nProvider({ children }: PropsWithChildren) {
  return <>{children}</>
}

const queryClient = new QueryClient();

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}