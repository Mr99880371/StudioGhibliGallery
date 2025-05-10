import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface para as interações do usuário
interface MovieInteraction {
  id: string;
  watched: boolean;
  favorite: boolean;
  rating: number;
  notes: string;
}

// Interface para o estado do usuário
interface UserMovieState {
  interactions: Record<string, MovieInteraction>;
}

// Estado inicial
const initialState: UserMovieState = {
  interactions: {},
};

// Cria o slice
const userMovieSlice = createSlice({
  name: "userMovies",
  initialState,
  reducers: {
    toggleWatched(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.interactions[id] ??= { id, watched: false, favorite: false, notes: "", rating: 0 };
      state.interactions[id].watched = !state.interactions[id].watched;
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.interactions[id] ??= { id, watched: false, favorite: false, notes: "", rating: 0 };
      state.interactions[id].favorite = !state.interactions[id].favorite;
    },
    setNote(state, action: PayloadAction<{ id: string; notes: string }>) {
      const { id, notes } = action.payload;
      state.interactions[id] ??= { id, watched: false, favorite: false, notes: "", rating: 0 };
      state.interactions[id].notes = notes;
    },
    setRating(state, action: PayloadAction<{ id: string; rating: number }>) {
      const { id, rating } = action.payload;
      state.interactions[id] ??= { id, watched: false, favorite: false, notes: "", rating: 0 };
      state.interactions[id].rating = rating;
    },
  },
});

// Exporta as ações
export const { toggleWatched, toggleFavorite, setNote, setRating } = userMovieSlice.actions;

// Exporta o reducer
export default userMovieSlice.reducer;
