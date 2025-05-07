import './globals.css';
import { ReactNode } from 'react';
import { UserProvider } from '@/contexts/UserContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
