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
    adult?: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    original_language?: string;
    original_title?: string;
    popularity?: number;
    video?: boolean;
  }
  
  export interface MovieDetails {
    adult: boolean;
    backdrop_path: string | null;
    belongs_to_collection: {
      id: number;
      name: string;
      poster_path: string;
      backdrop_path: string;
    } | null;
    budget: number;
    genres: {
      id: number;
      name: string;
    }[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
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
  
  export interface TrendingCardProps {
    movie: TrendingMovie;
    index: number;
  }
  