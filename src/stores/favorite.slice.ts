import { StateCreator } from 'zustand';

export interface FavoriteSlice {
  favorites: string[];
  favoritesLoading: boolean;
  favoritesError: string | null;
  addFavoriteLoading: boolean;
  addFavoriteError: string | null;
  removeFavoriteLoading: boolean;
  removeFavoriteError: string | null;
  fetchFavorites: () => Promise<void>;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  resetFavoritesError: () => void;
  resetAddFavoriteError: () => void;
  resetRemoveFavoriteError: () => void;
}

export const createFavoriteSlice: StateCreator<
  FavoriteSlice,
  [['zustand/immer', never], ['zustand/devtools', never]]
> = (set) => ({
  favorites: [],
  favoritesLoading: false,
  favoritesError: null,
  addFavoriteLoading: false,
  addFavoriteError: null,
  removeFavoriteLoading: false,
  removeFavoriteError: null,
  resetFavoritesError: () => set({ favoritesError: null }),
  resetAddFavoriteError: () => set({ addFavoriteError: null }),
  resetRemoveFavoriteError: () => set({ removeFavoriteError: null }),
  fetchFavorites: async () => {
    set({ favoritesLoading: true, favoritesError: null });
    try {
      const response = await fetch('/api/favorites');
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      const data: string[] = await response.json();
      set({ favorites: data });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred while fetching favorites';
      set({ favoritesError: errorMessage });
    } finally {
      set({ favoritesLoading: false });
    }
  },
  addFavorite: async (id: string) => {
    set({ addFavoriteLoading: true, addFavoriteError: null });
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to add to favorites');
      }
      set((state) => ({ favorites: [...state.favorites, id] }));
    } catch (err: unknown) {
      console.log(err);
      const errorMessage = 'An error occurred while adding to favorites';
      set({ addFavoriteError: errorMessage });
    } finally {
      set({ addFavoriteLoading: false });
    }
  },
  removeFavorite: async (id: string) => {
    set({ removeFavoriteLoading: true, removeFavoriteError: null });
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to remove from favorites');
      }
      set((state) => ({ favorites: state.favorites.filter((favId: string) => favId !== id) }));
    } catch (err: unknown) {
      console.log(err);
      const errorMessage = 'An error occurred while removing from favorites';
      set({ removeFavoriteError: errorMessage });
    } finally {
      set({ removeFavoriteLoading: false });
    }
  },
});
