import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie } from "../types";
import { fetchMovies } from "../services/movieService.ts";

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
  reducers: {},
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

export default movieSlice.reducer;