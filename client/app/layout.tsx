import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import Navbar from '@/components/Navbar';

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
          </ThemeProvider>
      </body>
    </html>
  );
}
