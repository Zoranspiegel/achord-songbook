import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongDetails, editSong } from '../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';
import ChordPlacer from './ChordPlacer';
import isUUID from '../utils/isUUID';
import anyHash from '../utils/anyHash';
import MainButton from './MainButton';
import style from './styles/SongDetails.module.css';

export default function SongDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.loggedUser.data.token);
  const songDetails = useSelector((state) => state.songDetails);
  const edited = useSelector((state) => state.editedSong.status === 'success');
  const { id } = useParams();

  useEffect(() => {
    if (isUUID(id)) {
      dispatch(getSongDetails(id, token));
    }
  }, [edited]);

  const editSongChord = (index, chordScheme) => {
    const body = {
      title: songDetails.data.title,
      artist: songDetails.data.artist,
      content: songDetails.data.content.split(/\n/).map((line, i) => {
        if (i === index.line) {
          return line.split(/\s/).map((word, j) => {
            if (j === index.word) {
              return `%${word.split('%')[1].split('-')[0]}-${chordScheme}%`;
            }
            return word;
          }).join(' ');
        }
        return line;
      }).join('\n')
    };
    dispatch(editSong(id, body, token));
    localStorage.setItem('fetchGate', false);
  };

  if (songDetails.status === 'loading') return null;
  if (songDetails.status === 'error')
    return <h1>Opps, it seems we have a problem :C </h1>;
  if (songDetails.status === 'success')
    return (
      <div className={style.details__container}>
        <MainButton onClick={() => navigate('/')}>Home</MainButton>
        <div className={style.details__plate}>
          <h1 className={style.details__title}>{songDetails.data.title}</h1>
          <h2 className={style.details__artist}>{songDetails.data.artist}</h2>
          <div className={style.details__content}>
            {songDetails.data.content.split(/\n/).map((line, lineIndex) => {
              return (
                <Fragment key={anyHash()}>
                  {line.split(/\s/).map((word, wordIndex) => {
                    if (/^%.+%$/.test(word)) {
                      return (
                        <ChordPlacer
                          key={anyHash()}
                          name={word.split('%')[1].split('-')[0]}
                          chord={word.split('%')[1].split('-')[1]}
                          index={ { line: lineIndex, word: wordIndex } }
                          editSongChord={editSongChord}
                        />
                      );
                    }
                    return <Fragment key={anyHash()}>{word}&nbsp;</Fragment>;
                  })}
                  {'\n'}
                </Fragment>
              );
            })}
          </div>
        </div>
        <MainButton
          onClick={() => navigate(`/song/edit/${songDetails.data.id}`)}
        >
          Edit Song
        </MainButton>
      </div>
    );
}
