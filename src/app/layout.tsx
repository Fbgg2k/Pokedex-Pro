
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Navigation from '@/components/layout/navigation';

export const metadata: Metadata = {
  title: 'Pokedex Pro',
  description: 'Explore the world of Pokémon!',
  manifest: '/manifest.json', // Assuming you might add a PWA manifest later
  icons: {
    apple: "/icon-192x192.png" // Example for PWA
  }
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster />
        <footer className="text-center py-4 text-muted-foreground text-sm">
          Powered by PokéAPI
        </footer>
      </body>
    </html>
  );
}
