import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Providers from '@/components/providers';
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "QR Generator",
  description: "An app to generate custom QR codes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <main className='h-screen'>
            <Navbar />
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
