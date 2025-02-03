import type { Metadata } from 'next'
import "./globals.css";
import Navbar from '@/components/Navbar';
import Providers from '@/components/providers';
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from '@/components/AuthProvider';

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
        <AuthProvider>
          <Providers>
            <main className='h-screen'>
              <Navbar />
              {children}
            </main>
            <Toaster />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
