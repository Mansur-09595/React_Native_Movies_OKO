export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date?: string;
    overview?: string;
    runtime?: number;
    vote_count?: number;
    genres?: { id: number; name: string }[];
    budget?: number;
    revenue?: number;
    production_companies?: { name: string }[];
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
  