
import type { PokemonListResponse, PokemonListItem, PokemonDetails, PokemonSpecies } from './types';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export function getPokemonIdFromUrl(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2], 10);
}

export function getPokemonImageUrl(id: number | string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export const POKEMON_TYPES_COLORS: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-700',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export const ALL_POKEMON_TYPES = Object.keys(POKEMON_TYPES_COLORS);

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

    // Fetch all Pokémon for each selected type
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
    
    // If more than one type is selected, we need to ensure the Pokémon matches ALL selected types (AND logic)
    // For OR logic (matches ANY type), the current combinedPokemonData is fine.
    // The prompt "o usuario pode escolher ate tres tipos para que a busca seja mais dinamica e simples"
    // suggests OR logic is simpler and likely intended. Let's proceed with OR logic.

    const totalCount = combinedPokemonData.length;
    // Sort by ID to maintain a consistent order if types are fetched in different orders
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
    // Original behavior: fetch all paginated
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
