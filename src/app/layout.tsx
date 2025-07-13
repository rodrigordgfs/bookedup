import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { GlobalLoading } from '@/components/auth/global-loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookedUp',
  description: 'A platform for booking appointments',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
                  <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <GlobalLoading />
        </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
