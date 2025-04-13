import { createSlice } from '@reduxjs/toolkit';
import { TrendingMovie } from "@/types/IMovie";
import { getTrendingMovies } from './trendingAction';

interface TrendingState {
  items: TrendingMovie[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TrendingState = {
  items: [],
  isLoading: false,
  error: null,
};

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrendingMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export default trendingSlice.reducer;
