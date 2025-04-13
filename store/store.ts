import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '@/store/reducers/movies/movieSlice';
import trendingReducer from '@/store/reducers/trending/trendingSlice';
import savedReducer from '@/store/reducers/saved/savedSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    trending: trendingReducer,
    saved: savedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;