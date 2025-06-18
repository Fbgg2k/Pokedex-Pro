
"use client";

import { Star } from 'lucide-react';
import { useFavoritesStore } from '@/store/favorites';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { capitalize } from '@/lib/pokemon';

interface FavoriteToggleButtonProps {
  pokemonId: number;
  pokemonName: string;
  className?: string;
  iconSize?: number;
}

export default function FavoriteToggleButton({ pokemonId, pokemonName, className, iconSize = 24 }: FavoriteToggleButtonProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore(state => state.actions);
  const isFav = useFavoritesStore(state => state.favoritePokemonIds.has(pokemonId));
  const { toast } = useToast();

  const handleToggle = () => {
    toggleFavorite(pokemonId);
    toast({
      title: isFav ? `${capitalize(pokemonName)} removed from favorites!` : `${capitalize(pokemonName)} added to favorites!`,
      description: isFav ? "It will no longer appear in your favorites list." : "You can find it in your favorites list.",
      duration: 3000,
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("text-yellow-400 hover:text-yellow-500 rounded-full p-2", className)}
      onClick={handleToggle}
      aria-label={isFav ? `Unmark ${capitalize(pokemonName)} as favorite` : `Mark ${capitalize(pokemonName)} as favorite`}
    >
      <Star 
        className={cn("transition-colors", isFav ? "fill-current text-yellow-400" : "text-muted-foreground")} 
        style={{ width: iconSize, height: iconSize }}
      />
    </Button>
  );
}
