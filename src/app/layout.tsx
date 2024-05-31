import type { Metadata } from 'next';

import { cn } from '@/lib/utils';

import { fontSans } from '@/styles/fonts';
import '@/styles/globals.css';
import Navbar from '@/components/sections/navbar/navbar';

export const metadata: Metadata = {
  title: 'Minder',
  description: 'A personal finance tracker'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'dark min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
