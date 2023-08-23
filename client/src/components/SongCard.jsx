import PropTypes from 'prop-types';

import style from './styles/SongCard.module.css';

export default function SongCard({ song }) {
  return (
    <div className={style.card__container}>
      <h1>{song.title}</h1>
      <h2>{song.artist}</h2>
      <p>{song.content.slice(0, 20)}...</p>
    </div>
  );
}

SongCard.propTypes = {
  song: PropTypes.object.isRequired
};
