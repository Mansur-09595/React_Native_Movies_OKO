import { createSlice } from '@reduxjs/toolkit';
import { loadSavedMovies, saveMovie, removeMovie } from './savedAction';
import { Movie } from '@/types/IMovie';

interface SavedState {
  movies: Movie[];
  isLoading: boolean;
}

const initialState: SavedState = {
  movies: [],
  isLoading: false,
};

const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSavedMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadSavedMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.isLoading = false;
      })
      .addCase(saveMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(removeMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((m) => m.id !== action.payload);
      });
  },
});

export default savedSlice.reducer;
