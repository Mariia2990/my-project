import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../../service/moviesApi";
import css from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";
import { MovieDetails } from "../../types/types";

const MovieDetailsPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const backLink = location.state?.from || "/";

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!movieId) return;
       setLoading(true);
      try {
        const movieData = await fetchMovieDetails(parseInt(movieId));
        setMovie(movieData);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }  finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  return (
    <div className={css.container}>
      <Link to={backLink} className={css.goBack}>
        Go back
      </Link>
      <div className={css.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={css.poster}
        />
        <div className={css.aboutMovies}>
          <h1 className={css.titleMovie}>{movie.title}</h1>
          <p className={css.subText}>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}
          </p>
          <p className={css.subText}>
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p className={css.subText}>
            <strong>Release date:</strong> {movie.release_date}
          </p>
          <p className={css.subText}>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h2 className={css.subTitleMovie}>Additional information</h2>
        <ul className={css.listInfo}>
          <li>
            <Link to="cast" state={{ from: backLink }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLink }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;