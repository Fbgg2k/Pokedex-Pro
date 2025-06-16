
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import type { PokemonListItem } from '@/lib/types';
import { capitalize } from '@/lib/pokemon';
import { useFavoritesStore } from '@/store/favorites';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore(state => state.actions);
  const isFav = useFavoritesStore(state => state.favoritePokemonIds.has(pokemon.id));

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking favorite button
    e.stopPropagation();
    toggleFavorite(pokemon.id);
  };

  return (
    <Link href={`/pokemon/${pokemon.id}`} className="block group animate-slide-in-up" style={{ animationDelay: `${pokemon.id % 10 * 50}ms`}}>
      <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:border-primary focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <CardHeader className="p-0 relative aspect-square flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <Image
            src={pokemon.imageUrl}
            alt={capitalize(pokemon.name)}
            width={180}
            height={180}
            className="object-contain transition-transform duration-300 group-hover:scale-110 p-4"
            data-ai-hint="pokemon character"
            priority={pokemon.id <= 20} // Prioritize loading for first few images
            unoptimized={true} // PokeAPI images are already optimized
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 text-yellow-400 hover:text-yellow-500 bg-background/50 hover:bg-background/70 rounded-full"
            onClick={handleFavoriteToggle}
            aria-label={isFav ? `Unmark ${capitalize(pokemon.name)} as favorite` : `Mark ${capitalize(pokemon.name)} as favorite`}
          >
            <Star className={cn("h-6 w-6 transition-colors", isFav ? "fill-current text-yellow-400" : "text-muted-foreground")} />
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-headline text-center truncate" title={capitalize(pokemon.name)}>
            {capitalize(pokemon.name)}
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">#{String(pokemon.id).padStart(4, '0')}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
