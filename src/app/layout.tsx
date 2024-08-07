import type { Metadata } from 'next';

import { cn } from '@/lib/utils';

import { fontSans } from '@/styles/fonts';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/toaster';

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
          'dark min-h-screen bg-background font-sans text-foreground antialiased',
          fontSans.variable
        )}
      >
        <div className='text-body-100 container'>{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
