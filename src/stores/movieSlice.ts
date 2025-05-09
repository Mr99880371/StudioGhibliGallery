import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie } from "../types";
import { fetchMovies } from "../services/movieService.ts";
import { PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
};

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  return await fetchMovies();
});

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    toggleWatched: (state, action: PayloadAction<string>) => {
      const movie = state.movies.find(m => m.id === action.payload);
      if (movie) movie.watched = !movie.watched;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const movie = state.movies.find(m => m.id === action.payload);
      if (movie) movie.favorite = !movie.favorite;
    },
    addNote: (state, action: PayloadAction<{ id: string; note: string }>) => {
      const movie = state.movies.find(m => m.id === action.payload.id);
      if (movie) movie.notes = action.payload.note;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar os filmes.";
      });
  },
});

export const { toggleWatched, toggleFavorite, addNote } = movieSlice.actions;

export default movieSlice.reducer;