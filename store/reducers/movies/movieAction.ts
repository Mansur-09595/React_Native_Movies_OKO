import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie, MovieDetails } from '@/types/IMovie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY;

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${API_KEY}`,
};

export const fetchMovies = createAsyncThunk<Movie[], { query?: string } | undefined>(
  'movies/fetchMovies',
  async (payload) => {
    const query = payload?.query || "";
    const endpoint = query
      ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await axios.get(endpoint, { headers });
    return response.data.results;
  }
);

export const fetchSearchMovies = createAsyncThunk<Movie[], { query: string }>(
  'movies/fetchSearchMovies',
  async ({ query }) => {
    const endpoint = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`;
    const response = await axios.get(endpoint, { headers });
    return response.data.results;
  }
);

export const fetchMovieDetails = createAsyncThunk<MovieDetails, string>(
  'movies/fetchMovieDetails',
  async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, { headers });
    return response.data;
  }
);
