import { createSlice } from '@reduxjs/toolkit';
import { TrendingMovie } from "@/types/IMovie";
import { getTrendingMovies } from './trendingAction';

// 👉 1. Определяем тип состояния
interface TrendingState {
  items: TrendingMovie[];
  isLoading: boolean;
  error: string | null;
}

// 👉 2. Начальное состояние с типом
const initialState: TrendingState = {
  items: [],
  isLoading: false,
  error: null,
};

// 👉 3. Создаём слайс с типами
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
