import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../service/moviesApi';
import css from './MovieReviews.module.css';
import { Review } from '@/types/types';

const MovieReviews: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        const reviewsData = await fetchMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error("Failed to fetch movie reviews:", error);
      }
    };

    getMovieReviews();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>No reviews available for this movie.</p>;
  }

  return (
    <ul className={css.reviewsList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.reviewItem}>
          <h4>Author: {author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
