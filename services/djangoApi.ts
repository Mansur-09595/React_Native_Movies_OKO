import axios from 'axios';

// For Android emulator, use 10.0.2.2 to access localhost
// For iOS simulator, use localhost
// For physical devices, use your computer's IP address on the same network
const API_BASE_URL='https://oko-movies-database.onrender.com/'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  // Add other movie properties as needed
}

export interface TrendingMovie {
  id: number;
  search_term: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
  created_at: string;
  updated_at: string;
}

export const updateSearchCount = async (query: string, movie: Movie): Promise<void> => {
  if (!query || !movie?.id || !movie?.title || !movie?.poster_path) {
    console.warn("❌ Недостаточно данных для запроса:", { query, movie });
    return;
  }

  const payload = {
    search_term: query,
    movie_id: movie.id,
    title: movie.title,
    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  };

  console.log("🚀 Payload отправки в Django:", payload);

  try {
    await apiClient.post('/api/update-search-count/', payload);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Ошибка обновления счётчика поиска:', error.response?.data);
    }
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const response = await apiClient.get('/api/trending-movies/');
    
    console.log("Trending Movies Data: ", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    if (axios.isAxiosError(error)) {
      console.error("🔥 Axios Error:", error.message);
      console.log("🔥 Axios config:", error.config);
      console.log("🔥 Axios response:", error.response?.data);
    } else {
      console.error("Unknown Error:", error);
    }
    return undefined;
  }
};
