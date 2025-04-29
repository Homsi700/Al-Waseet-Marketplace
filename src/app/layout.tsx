import type {Metadata} from 'next';
import {Inter} from 'next/font/google'; // Changed font for better character support
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin', 'arabic'], // Added arabic subset
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Al-Waseet Marketplace',
  description: 'Your trusted intermediary marketplace',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl"> {/* Set language to Arabic and direction to RTL */}
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable
        )}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
