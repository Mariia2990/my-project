import { Link, useLocation } from "react-router-dom";
import { FC } from 'react';
import css from './MoviesList.module.css'
import {Movie} from '../../types/types'

interface MoviesListProps {
  movies: Movie[];
}

const MoviesList: FC<MoviesListProps> = ({ movies = [] }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <li className={css.item} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={css.posterList}
              />
            </Link>
          </li>
        ))
      ) : (
        <p>No movies available.</p>
      )}
    </ul>
  );
};


export default MoviesList;