export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export interface MovieDetails extends Movie {
  title: string;
  poster_path: string;
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number; 
  release_date: string;
  overview: string;
}

export interface CastMember {
  id: number;
  character: string;
  name: string;
  profile_path: string;
}

export interface Review {
  id: number;
  author: string;
  content: string;
}