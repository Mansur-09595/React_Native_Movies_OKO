import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieDetails, fetchSearchMovies } from './movieAction';
import { Movie, MovieDetails } from '@/types/IMovie';

interface MovieState {
  latestMovies: Movie[];
  searchResults: Movie[];
  selectedMovie: MovieDetails | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  latestMovies: [],
  searchResults: [],
  selectedMovie: null,
  isLoading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.latestMovies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })

      .addCase(fetchSearchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })

      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.selectedMovie = action.payload;
      });
  },
});

export const { clearSearchResults } = movieSlice.actions;
export default movieSlice.reducer;
