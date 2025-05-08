// src/services/movieService.ts
import axios from "axios";
import { Movie } from "../types";

const BASE_URL = "https://ghibliapi.vercel.app";

export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(`${BASE_URL}/films`);
  return response.data;
};
