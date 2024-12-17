// src/components/Providers.tsx
'use client'

import { PropsWithChildren } from 'react'
import '../i18n'

export function I18nProvider({ children }: PropsWithChildren) {
  return <>{children}</>
}