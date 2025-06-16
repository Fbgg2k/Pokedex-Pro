
"use client";

import { useEffect, useState } from 'react';
import { useFavoritesStore } from '@/store/favorites';
import { fetchPokemonDetails } from '@/lib/pokemon';
import type { PokemonListItem, PokemonDetails } from '@/lib/types';
import PokemonCard from './pokemon-card';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { AlertCircle, StarOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function FavoritesPageClient() {
  const favoriteIds = useFavoritesStore((state) => Array.from(state.favoritePokemonIds));
  const [favoritePokemons, setFavoritePokemons] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      if (favoriteIds.length === 0) {
        setFavoritePokemons([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const promises = favoriteIds.map(id => fetchPokemonDetails(id));
        const results = await Promise.all(promises);
        
        const fetchedPokemons = results
          .filter((p): p is PokemonDetails => p !== null)
          .map(p => ({
            id: p.id,
            name: p.name,
            url: `https://pokeapi.co/api/v2/pokemon/${p.id}/`, // Construct URL
            imageUrl: p.sprites.other?.['official-artwork']?.front_default || p.sprites.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`,
          }));
        
        setFavoritePokemons(fetchedPokemons);
      } catch (err) {
        console.error("Failed to load favorite Pokémon details:", err);
        setError("Could not load favorite Pokémon. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [favoriteIds.join(',')]); // Depend on stringified array to detect changes in IDs

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <LoadingSpinner size={48} />
        <p className="mt-4 text-lg text-muted-foreground">Loading your favorite Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (favoritePokemons.length === 0) {
    return (
      <div className="text-center py-20 flex flex-col items-center">
        <StarOff className="w-24 h-24 text-muted-foreground/50 mb-6" />
        <h2 className="text-3xl font-semibold text-foreground mb-2">No Favorites Yet</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Start adding Pokémon to your favorites to see them here!
        </p>
        <Button asChild size="lg">
          <Link href="/">Browse Pokémon</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {favoritePokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
