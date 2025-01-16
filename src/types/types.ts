export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
}

export interface CastMember {
  id: number;
  character: string;
  name: string;
  profile_path: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
}