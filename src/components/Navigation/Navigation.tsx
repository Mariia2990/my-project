import { NavLink, Link} from 'react-router-dom';
import css from './Navigation.module.css';
import { SiThemoviedatabase } from "react-icons/si";

const Navigation = () => {
  return (

    <nav className={css.nav}>
      <Link to="/" className={css.logoLink}>
        <SiThemoviedatabase className={css.logoIcon} />
      </Link>
      <NavLink to="/" className={({ isActive }) => (isActive ? css.isActive : css.link)}>
        Home
      </NavLink>
      <NavLink to="/movies" className={({ isActive }) => (isActive ? css.isActive : css.link)}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;