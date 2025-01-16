import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../service/moviesApi';
import css from './HomePage.module.css'
import MoviesList from '../../components/MoviesList/MoviesList';
import { Movie } from '@/types/types';

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
   const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const getTrendingMovies = async (): Promise<void> => {
      try {
        const results: Movie[] = await fetchTrendingMovies();
        setMovies(results);
      } catch (error) {
        setError(
          `Failed to fetch trending movies: ${(error as Error).message}`
        );
      }
    };
    getTrendingMovies();
  }, []);
  return (
    <div>
      <h1 className={css.titleMovie}>Trending Movies</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MoviesList movies={movies} />
    </div>
  );
};

export default HomePage;