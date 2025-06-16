
"use client";

import Link from 'next/link';
import { Star, Home } from 'lucide-react'; 
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './theme-switcher';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/favorites', label: 'Favorites', icon: Star },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2 text-primary-foreground hover:opacity-80 transition-opacity">
          <svg role="img" viewBox="0 0 24 24" className="h-8 w-8 fill-current">
            <title>Pokeball</title>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4h.01M12 16c-2.21 0-4-1.79-4-4H6c0 3.31 2.69 6 6 6s6-2.69 6-6h-2c0 2.21-1.79 4-4 4zM12 7c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
          </svg>
          <span className="font-bold text-xl font-headline">Pokedex Pro</span>
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-foreground/10",
                pathname === item.href ? "bg-primary-foreground/20 text-primary-foreground" : "text-primary-foreground/80 hover:text-primary-foreground"
              )}
              aria-label={item.label}
            >
              <item.icon className="h-5 w-5" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}
