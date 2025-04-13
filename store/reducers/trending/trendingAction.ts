import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Movie } from '@/types/IMovie';

const api = axios.create({
  baseURL: 'https://oko-movies-database.onrender.com/',
  headers: { 'Content-Type': 'application/json' },
});

export const getTrendingMovies = createAsyncThunk(
  'trending/getTrendingMovies',
  async () => {
    const response = await api.get('/api/trending-movies/');
    return response.data;
  }
);

// ✅ Вариант с createAsyncThunk
export const updateSearchCount = createAsyncThunk<
  void,
  { query: string; movie: Movie }
>(
  'trending/updateSearchCount',
  async ({ query, movie }, { rejectWithValue }) => {
    const payload = {
      search_term: query,
      movie_id: movie.id,
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    };

    try {
      await api.post('/api/update-search-count/', payload);
    } catch (error) {
      console.error("🔥 updateSearchCount error:", error);
      return rejectWithValue(error);
    }
  }
);
