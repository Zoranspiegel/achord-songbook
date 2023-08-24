import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import style from './styles/SongCard.module.css';

export default function SongCard({ song }) {
  return (
    <NavLink to={`/song/details/${song.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={style.card__container}>
        <h1 className={style.card__title}>{song.title}</h1>
        <h2 className={style.card__artist}>{song.artist}</h2>
        <p className={style.card__content}>{song.content.slice(0, 20)}...</p>
      </div>
    </NavLink>
  );
}

SongCard.propTypes = {
  song: PropTypes.object.isRequired,
};
