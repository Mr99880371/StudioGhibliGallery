import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface para os filtros
interface FilterState {
  watched: boolean;
  favorites: boolean;
  withNotes: boolean;
  rating: number | null; // null = todos
  search: string;
  includeSynopsis: boolean;
  sortBy: string;
}

// Inicializa os filtros
const initialState: FilterState = {
  watched: false,
  favorites: false,
  withNotes: false,
  rating: null,
  search: '',
  includeSynopsis: false,
  sortBy: 'default',
};

// Cria o slice dos filtros
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
    setRatingFilter: (state, action: PayloadAction<number | null>) => {
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
    setWatched: (state, action: PayloadAction<boolean>) => {
      state.watched = action.payload;
    },
    setFavorites: (state, action: PayloadAction<boolean>) => {
      state.favorites = action.payload;
    },
    setWithNotes: (state, action: PayloadAction<boolean>) => {
      state.withNotes = action.payload;
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

// Exporta as ações
export const {
  toggleWatched,
  toggleFavorites,
  toggleWithNotes,
  setRatingFilter, 
  setSearch,
  toggleIncludeSynopsis,
  setSortBy,
  clearFilters,
  setWatched,
  setFavorites,
  setWithNotes,
} = filterSlice.actions;

// Exporta o reducer
export default filterSlice.reducer;
