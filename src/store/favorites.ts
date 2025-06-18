
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { PokemonDetails } from '@/lib/types';

interface FavoritesState {
  favoritePokemonIds: Set<number>;
  actions: {
    toggleFavorite: (pokemonId: number) => void;
    isFavorite: (pokemonId: number) => boolean;
    getFavoriteIds: () => number[];
  };
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoritePokemonIds: new Set<number>(),
      actions: {
        toggleFavorite: (pokemonId) =>
          set((state) => {
            const newFavoritePokemonIds = new Set(state.favoritePokemonIds);
            if (newFavoritePokemonIds.has(pokemonId)) {
              newFavoritePokemonIds.delete(pokemonId);
            } else {
              newFavoritePokemonIds.add(pokemonId);
            }
            return { favoritePokemonIds: newFavoritePokemonIds };
          }),
        isFavorite: (pokemonId) => get().favoritePokemonIds.has(pokemonId),
        getFavoriteIds: () => Array.from(get().favoritePokemonIds),
      }
    }),
    {
      name: 'pokemon-favorites-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // partialize to store only the Set as an array
      partialize: (state) => ({ favoritePokemonIds: Array.from(state.favoritePokemonIds) }),
      // rehydrate the Set from an array
      onRehydrateStorage: () => (state, error) => {
        if (state) {
          state.favoritePokemonIds = new Set(state.favoritePokemonIds as unknown as number[]);
        }
      }
    }
  )
);

// Export actions directly for easier use
export const useFavoriteActions = () => useFavoritesStore((state) => state.actions);
// Export favorite IDs for direct access if needed, or use the action
export const useFavoriteIds = () => useFavoritesStore((state) => state.favoritePokemonIds);
