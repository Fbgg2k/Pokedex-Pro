
export interface PokemonListItem {
  name: string;
  url: string;
  id: number;
  imageUrl: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: {
    dream_world: {
      front_default: string | null;
    };
    'official-artwork': {
      front_default: string | null;
    };
  };
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number; // decimetres
  weight: number; // hectograms
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
  base_experience: number;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface PokemonSpecies {
  id: number;
  name:string;
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: {
    name: string;
    url: string;
  } | null;
  genera: Array<{genus: string, language: { name: string, url: string}}>;
  capture_rate: number;
  habitat: { name: string, url: string} | null;
}

export interface FavoritePokemon extends PokemonDetails {
  speciesData?: PokemonSpecies;
}
