import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "@/services/djangoApi";

const STORAGE_KEY = "saved_movies";

export const getSavedMovies = async (): Promise<Movie[]> => {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
};

export const saveMovie = async (movie: Movie): Promise<void> => {
  const movies = await getSavedMovies();
  const alreadySaved = movies.some((m) => m.id === movie.id);

  if (!alreadySaved) {
    const updated = [...movies, movie];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};

export const removeMovie = async (movieId: number): Promise<void> => {
  const movies = await getSavedMovies();
  const updated = movies.filter((m) => m.id !== movieId);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const isMovieSaved = async (movieId: number): Promise<boolean> => {
  const movies = await getSavedMovies();
  return movies.some((m) => m.id === movieId);
};
