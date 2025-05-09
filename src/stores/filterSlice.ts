import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  watched: boolean;
  favorites: boolean;
  withNotes: boolean;
  rating: number | null; // null = todos
  search: string;
  includeSynopsis: boolean;
  sortBy: string;
}

const initialState: FilterState = {
  watched: false,
  favorites: false,
  withNotes: false,
  rating: null,
  search: '',
  includeSynopsis: false,
  sortBy: 'default',
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleWatched: (state) => {
      state.watched = !state.watched;
    },
    toggleFavorites: (state) => {
      state.favorites = !state.favorites;
    },
    toggleWithNotes: (state) => {
      state.withNotes = !state.withNotes;
    },
    setRating: (state, action: PayloadAction<number | null>) => {
      state.rating = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    toggleIncludeSynopsis: (state) => {
      state.includeSynopsis = !state.includeSynopsis;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    clearFilters: (state) => {
      state.watched = false;
      state.favorites = false;
      state.withNotes = false;
      state.rating = null;
      state.search = '';
      state.includeSynopsis = false;
      state.sortBy = 'default';
    }
  },
});

export const {
  toggleWatched,
  toggleFavorites,
  toggleWithNotes,
  setRating,
  setSearch,
  toggleIncludeSynopsis,
  setSortBy,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
