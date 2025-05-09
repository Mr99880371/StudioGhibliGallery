import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieInteraction {
  id: string;
  watched: boolean;
  favorite: boolean;
  rating: number;
  notes: string;
}

interface UserMovieState {
  interactions: Record<string, MovieInteraction>;
}

const initialState: UserMovieState = {
  interactions: {},
};

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

export const { toggleWatched, toggleFavorite, setNote, setRating } = userMovieSlice.actions;
export default userMovieSlice.reducer;
