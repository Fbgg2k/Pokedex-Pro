
"use client";

import type { PokemonListItem } from '@/lib/types';
import PokemonCard from './pokemon-card';

interface ClientPokemonGridProps {
  pokemonList: PokemonListItem[];
}

export default function ClientPokemonGrid({ pokemonList }: ClientPokemonGridProps) {
  if (!pokemonList || pokemonList.length === 0) {
    return <p className="text-center text-lg text-muted-foreground py-10">No Pokémon found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemonList.map((pokemon, index) => (
        <PokemonCard key={pokemon.id} pokemon={{...pokemon, id: pokemon.id || index }} />
      ))}
    </div>
  );
}
