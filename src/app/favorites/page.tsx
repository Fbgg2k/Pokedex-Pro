
import FavoritesPageClient from '@/components/pokemon/favorites-page-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favorite Pokémon | Pokedex Pro',
  description: 'View your collection of favorite Pokémon.',
};

export default function FavoritesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center text-primary font-headline tracking-tight">
        Seus Pokémons Favoritos
      </h1>
      <FavoritesPageClient />
    </div>
  );
}
