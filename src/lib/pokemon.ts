
import type { PokemonListResponse, PokemonListItem, PokemonDetails, PokemonSpecies } from './types';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export function getPokemonIdFromUrl(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2], 10);
}

export function getPokemonImageUrl(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export const POKEMON_TYPE_CLASSES: Record<string, { base: string; hover: string; textClass: string }> = {
  normal: { base: 'bg-stone-400', hover: 'hover:bg-stone-500', textClass: 'text-white' },
  fire: { base: 'bg-red-500', hover: 'hover:bg-red-600', textClass: 'text-white' },
  water: { base: 'bg-rose-400', hover: 'hover:bg-rose-500', textClass: 'text-white' }, // Cor ajustada conforme imagem de Squirtle
  electric: { base: 'bg-yellow-400', hover: 'hover:bg-yellow-500', textClass: 'text-neutral-800' },
  grass: { base: 'bg-green-500', hover: 'hover:bg-green-600', textClass: 'text-white' },
  ice: { base: 'bg-cyan-400', hover: 'hover:bg-cyan-500', textClass: 'text-neutral-800' },
  fighting: { base: 'bg-orange-600', hover: 'hover:bg-orange-700', textClass: 'text-white' },
  poison: { base: 'bg-purple-500', hover: 'hover:bg-purple-600', textClass: 'text-white' },
  ground: { base: 'bg-yellow-600', hover: 'hover:bg-yellow-700', textClass: 'text-white' },
  flying: { base: 'bg-indigo-400', hover: 'hover:bg-indigo-500', textClass: 'text-white' },
  psychic: { base: 'bg-pink-500', hover: 'hover:bg-pink-600', textClass: 'text-white' },
  bug: { base: 'bg-lime-500', hover: 'hover:bg-lime-600', textClass: 'text-neutral-800' },
  rock: { base: 'bg-amber-700', hover: 'hover:bg-amber-800', textClass: 'text-white' }, // Alterado de yellow-700 para amber para diferenciar de ground
  ghost: { base: 'bg-purple-700', hover: 'hover:bg-purple-800', textClass: 'text-white' },
  dragon: { base: 'bg-indigo-700', hover: 'hover:bg-indigo-800', textClass: 'text-white' },
  dark: { base: 'bg-neutral-700', hover: 'hover:bg-neutral-800', textClass: 'text-white' },
  steel: { base: 'bg-slate-500', hover: 'hover:bg-slate-600', textClass: 'text-white' },
  fairy: { base: 'bg-pink-400', hover: 'hover:bg-pink-500', textClass: 'text-white' },
  unknown: { base: 'bg-gray-500', hover: 'hover:bg-gray-600', textClass: 'text-white' }, // Fallback
};

export const ALL_POKEMON_TYPES = Object.keys(POKEMON_TYPE_CLASSES).filter(type => type !== 'unknown');


async function fetchPokemonIdsAndNamesByType(typeName: string): Promise<{id: number, name: string, url: string}[]> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/type/${encodeURIComponent(typeName.toLowerCase())}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon for type ${typeName}: ${response.statusText}`);
    }
    const data = await response.json();
    return data.pokemon.map((p: { pokemon: { name: string; url: string } }) => {
      const id = getPokemonIdFromUrl(p.pokemon.url);
      return { id, name: p.pokemon.name, url: p.pokemon.url };
    });
  } catch (error) {
    console.error(`Error fetching Pokémon IDs and names for type ${typeName}:`, error);
    return [];
  }
}

export async function fetchPokemonList(
  page: number = 1,
  limit: number = 20,
  selectedTypes: string[] = []
): Promise<{ pokemon: PokemonListItem[], totalPages: number, currentPage: number, totalCount: number }> {
  const offset = (page - 1) * limit;

  if (selectedTypes.length > 0) {
    let combinedPokemonData: {id: number, name: string, url: string}[] = [];
    const seenPokemonIds = new Set<number>();

    const promises = selectedTypes.map(type => fetchPokemonIdsAndNamesByType(type));
    const results = await Promise.all(promises);

    for (const pokemonOfType of results) {
      for (const p of pokemonOfType) {
        if (!seenPokemonIds.has(p.id)) {
          combinedPokemonData.push(p);
          seenPokemonIds.add(p.id);
        }
      }
    }
    
    const totalCount = combinedPokemonData.length;
    combinedPokemonData.sort((a, b) => a.id - b.id); 
    
    const paginatedData = combinedPokemonData.slice(offset, offset + limit);

    const pokemonWithDetails: PokemonListItem[] = paginatedData.map(p => ({
      ...p,
      imageUrl: getPokemonImageUrl(p.id),
    }));

    return {
      pokemon: pokemonWithDetails,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      totalCount: totalCount
    };

  } else {
    try {
      const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon list: ${response.statusText}`);
      }
      const data: PokemonListResponse = await response.json();
      
      const pokemonWithDetails = data.results.map(p => {
        const id = getPokemonIdFromUrl(p.url);
        return {
          ...p,
          id,
          imageUrl: getPokemonImageUrl(id)
        };
      });

      return {
        pokemon: pokemonWithDetails,
        totalPages: Math.ceil(data.count / limit),
        currentPage: page,
        totalCount: data.count
      };
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
      return { pokemon: [], totalPages: 0, currentPage: 1, totalCount: 0 };
    }
  }
}


export async function fetchPokemonDetails(idOrName: string | number): Promise<PokemonDetails | null> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok) {
      if (response.status === 404) return null; 
      throw new Error(`Failed to fetch Pokémon details for ${idOrName}: ${response.statusText}`);
    }
    const data: PokemonDetails = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon details for ${idOrName}:`, error);
    return null;
  }
}

export async function fetchPokemonSpecies(idOrName: string | number): Promise<PokemonSpecies | null> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${idOrName}`);
     if (!response.ok) {
      if (response.status === 404) return null; 
      throw new Error(`Failed to fetch Pokémon species data for ${idOrName}: ${response.statusText}`);
    }
    const data: PokemonSpecies = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching Pokemon species for ${idOrName}:`, error);
    return null;
  }
}

export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
