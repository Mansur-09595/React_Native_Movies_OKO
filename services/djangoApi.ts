import axios from 'axios';

// For Android emulator, use 10.0.2.2 to access localhost
// For iOS simulator, use localhost
// For physical devices, use your computer's IP address on the same network

// Create axios instance
const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
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
  try {
    await apiClient.post('/api/update-search-count/', {
      query,
      movie_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error updating search count:', error.response?.data);
    }
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const response = await apiClient.get('/api/trending-movies/');
    
    // Логируем данные, которые пришли с API
    console.log("Trending Movies Data: ", response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return undefined;
  }
};
