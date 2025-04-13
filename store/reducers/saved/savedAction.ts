import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'saved_movies';

export const loadSavedMovies = createAsyncThunk('saved/load', async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
});

export const saveMovie = createAsyncThunk('saved/save', async (movie: any) => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  const movies = json ? JSON.parse(json) : [];
  const updated = [...movies, movie];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return movie;
});

export const removeMovie = createAsyncThunk('saved/remove', async (movieId: number) => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  const movies = json ? JSON.parse(json) : [];
  const updated = movies.filter((m: any) => m.id !== movieId);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return movieId;
});