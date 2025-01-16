import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMovies } from '../../service/moviesApi';
import MoviesList from '../../components/MoviesList/MoviesList';
import toast from 'react-hot-toast'
import SearchForm from '../../components/SearchForm/SearchForm'
import { Movie } from '@/types/types';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (queryParam) {
      fetchMovies(queryParam);
    }
  }, [queryParam]);

  const fetchMovies = async (query:string): Promise<void> => {
    try {
      const results = await searchMovies(query);
      if (results.length === 0) {
        toast.error("No movies found! Try another query.");
      }
      setMovies(results);
    } catch (error) {
      console.error("Failed to search movies:", error);
      toast.error("Error fetching movies! Please try again later.");
    }
  };

  const handleSearch = (query: string): void => {
    navigate(`?query=${query}`, { state: { from: location } });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearch} initialQuery={queryParam} />
      <MoviesList movies={movies} />
    </div>
  );
};

export default MoviesPage;
