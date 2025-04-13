import { createSlice } from '@reduxjs/toolkit';
import { loadSavedMovies, saveMovie, removeMovie } from './savedAction';

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    movies: [] as { id: string; [key: string]: any }[],
    isLoading: false,
  },
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
        state.movies = state.movies.filter((m) => Number(m.id) !== action.payload);      });
  },
});

export default savedSlice.reducer;