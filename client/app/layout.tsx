import type { Metadata } from 'next'
import "./globals.css";
import Navbar from '@/components/Navbar';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from '@/components/theme-provider'
import { QrProvider } from '@/context/QrContext'

export const metadata: Metadata = {
  title: "QR Generator",
  description: "Generate QR codes for your links",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <QrProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className='h-screen'>
              <Navbar />
              {children}
            </main>
            <Toaster />
        </ThemeProvider>
      </QrProvider>  
      </body>
    </html>
  );
}
