import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import style from './styles/SongCard.module.css';

export default function SongCard({ song }) {
  return (
    <NavLink
      to={`/song/details/${song.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Tilt glareEnable='true' glareBorderRadius='10px'>
        <div className={style.card__container}>
          <div className={style.card__padding}>
            <h1 className={style.card__title}>{song.title}</h1>
            <h2 className={style.card__artist}>{song.artist}</h2>
            <p className={style.card__content}>{song.content}</p>
          </div>
        </div>
      </Tilt>
    </NavLink>
  );
}

SongCard.propTypes = {
  song: PropTypes.object.isRequired,
};
