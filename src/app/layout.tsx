
import type {Metadata} from 'next';
import './globals.css';
import { CartProvider } from './context/cart-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'CommerceFlow | Professional Electronics Shop',
  description: 'A sophisticated e-commerce experience for tech enthusiasts.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
