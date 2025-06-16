
import type { PokemonListResponse, PokemonListItem, PokemonDetails, PokemonSpecies } from './types';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

export function getPokemonIdFromUrl(url: string): number {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2], 10);
}

export function getPokemonImageUrl(id: number | string): string {
  // Using official artwork if possible, fallback to default sprite
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export async function fetchPokemonList(page: number = 1, limit: number = 20): Promise<{ pokemon: PokemonListItem[], totalPages: number, currentPage: number }> {
  const offset = (page - 1) * limit;
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
    };
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    // Return empty or error state as per app's error handling strategy
    return { pokemon: [], totalPages: 0, currentPage: 1 };
  }
}

export async function fetchPokemonDetails(idOrName: string | number): Promise<PokemonDetails | null> {
  try {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok) {
      if (response.status === 404) return null; // Pokemon not found
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
      if (response.status === 404) return null; // Species data not found
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
