import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import style from './styles/SongCard.module.css';
import anyHash from '../utils/anyHash';

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
            <p className={style.card__content}>
              {song.content.split(/\n/).map((line) => {
                if (line.split(/\s/).find((item) => /^[a-zA-Z]/.test(item))) {
                  return (
                    <Fragment key={anyHash()}>
                      {line.split(/\s/).map((word) => {
                        if (/^%.+%$/.test(word)) {
                          return (
                            <Fragment key={anyHash()}>
                              {word
                                .split('')
                                .filter((char) => char !== '%' && char !== '-')
                                .join('')}
                              &nbsp;
                            </Fragment>
                          );
                        } else {
                          return (
                            <Fragment key={anyHash()}>{word}&nbsp;</Fragment>
                          );
                        }
                      })}
                      {'\n'}
                    </Fragment>
                  );
                } else {
                  return (
                    <Fragment key={anyHash()}>
                      {line.split(/\s/).map((word) => {
                        if (/^%.+%$/.test(word)) {
                          return (
                            <span className={style.card__chord} key={anyHash()}>
                              {word.split('%')[1].split('-')[0]}&nbsp;
                            </span>
                          );
                        } else {
                          return (
                            <Fragment key={anyHash()}>{word}&nbsp;</Fragment>
                          );
                        }
                      })}
                      {'\n'}
                    </Fragment>
                  );
                }
              })}
            </p>
          </div>
        </div>
      </Tilt>
    </NavLink>
  );
}

SongCard.propTypes = {
  song: PropTypes.object.isRequired,
};
