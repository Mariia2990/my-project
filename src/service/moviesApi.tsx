import { CastMember, Movie, MovieDetails, Review } from '@/types/types';
import axios from 'axios';


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});


// Отримати популярні фільми
export const fetchTrendingMovies = async ():Promise<Movie[]> => {
  try {
    const response = await axiosInstance.get<{ results: Movie[] }>('/trending/movie/day')
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

// Пошук фільмів за ключовим словом
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axiosInstance.get<{results: Movie[]}>('/search/movie', {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching for movies:', error);
    throw error;
  }
};

// Деталі фільму за ID
export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    const response = await axiosInstance.get<MovieDetails>(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Акторський склад фільму
export const fetchMovieCast = async (movieId: number): Promise<CastMember[]> => {
  try {
    const response = await axiosInstance.get<{cast: CastMember[]}>(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw error;
  }
};

// Відгуки про фільм
export const fetchMovieReviews = async (movieId: number): Promise<Review[]> => {
  try {
    const response = await axiosInstance.get<{results: Review[]}>(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};