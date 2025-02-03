'use client'
 
import { SessionProvider } from 'next-auth/react'
import { QrProvider } from '@/context/QrContext'
import { ThemeProvider } from '@/components/theme-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QrProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QrProvider>
    </SessionProvider>
  )
}
