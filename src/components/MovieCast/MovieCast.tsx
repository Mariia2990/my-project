import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../service/moviesApi';
import css from './MovieCast.module.css'
import { MdOutlineImageNotSupported } from "react-icons/md";
import { CastMember } from '@/types/types';

const MovieCast: React.FC = () => {
    const { movieId } = useParams<{movieId: string}>();
  const [cast, setCast] = useState <CastMember[]>([]);
  
    useEffect(() => {
        const getMovieCast = async () => {
            try {
                const castData = await fetchMovieCast(parseInt(movieId));
                setCast(castData);
            } catch (error) {
                console.error('Failed to fetch movie cast:', error);
            }
        }
        getMovieCast();
    }, [movieId]);
    if (cast.length === 0) {
        return <p>No cast information available for this movie.</p>;
    };

return (
    <ul className={css.castList}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={css.castItem}>
          {profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
              className={css.profileImage}
            />
          ) : (
              <div className={css.placeholder}><MdOutlineImageNotSupported className={css.iconNoImage} />
</div>
          )}
          <p className={css.nameActor}><strong>{name}</strong></p>
          <p className={css.character}>{character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;