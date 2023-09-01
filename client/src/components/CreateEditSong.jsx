import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cleanEdit, createSong, editSong, openFetchGate } from '../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';
import isChord from '../utils/isChord';
import isUUID from '../utils/isUUID';
import MainButton from './MainButton';
import style from './styles/CreateEditSong.module.css';

const initialSongState = {
  title: '',
  artist: '',
  content: '',
};

export default function CreateEditSong() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.loggedUser.data.token);
  const songDetails = useSelector((state) => state.songDetails);
  const edited = useSelector((state) => state.editedSong.status);
  const [songState, setSongState] = useState(initialSongState);

  // EDITION_STATE_SETTING
  useEffect(() => {
    if (isUUID(id) && songDetails.status === 'success') {
      const cacheChords = [];
      const editState = {
        ...songDetails.data,
        content: songDetails.data.content.split(/\n/).map((line) => {
          return line.split(/\s/).map((word) => {
            if (/^%.+%$/.test(word)) {
              const cacheChord = {
                chord: word.split('%')[1].split('-')[0],
                scheme: word.split('%')[1].split('-')[1]
              };
              cacheChords.push(cacheChord);
              return cacheChord.chord;
            }
            return word;
          }).join(' ');
        }).join('\n')
      };
      localStorage.setItem('cacheChords', JSON.stringify(cacheChords));
      setSongState(editState);
    }
  }, []);

  // HANDLE_CHANGE
  const handleChange = (e) => {
    setSongState({
      ...songState,
      [e.target.name]: e.target.value,
    });
  };

  // NAVIGATION_&_CLEANING
  useEffect(() => {
    if (edited === 'success') navigate(`/song/details/${id}`);
    return () => {
      if (edited === 'success') dispatch(cleanEdit());
    };
  }, [edited]);

  // HANDLE_SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    // EDIT_SONG
    if (songDetails.status === 'success') {
      const body = {
        ...songState,
        content: songState.content.split(/\n/).map((line) => {
          return line.split(/\s/).map((word) => {
            if (isChord(word)) {
              const cacheChords = JSON.parse(localStorage.getItem('cacheChords'));
              const index = cacheChords.findIndex(item => item.chord === word);
              if (index >= 0) {
                const scheme = { ...cacheChords[index] }.scheme;
                cacheChords.splice(index, 1);
                localStorage.setItem('cacheChords', JSON.stringify(cacheChords));
                return `%${word}-${scheme}%`;
              }
              return `%${word}-%`;
            }
            return word;
          }).join(' ');
        }).join('\n'),
      };
      dispatch(editSong(id, body, token));
      setSongState(initialSongState);
      localStorage.removeItem('cacheChords');
      dispatch(openFetchGate());
    }
    
    // CREATE_SONG
    if (songDetails.status === 'idle') {
      const body = {
        ...songState,
        content: songState.content.split(/\n/).map((line) => {
          return line.split(/\s/).map((word) => {
            if (isChord(word)) return `%${word}-%`;
            return word;
          }).join(' ');
        }).join('\n')
      };
      dispatch(createSong(body, token));
      setSongState(initialSongState);
      dispatch(openFetchGate());
      navigate('/');
    }
  };

  if (edited === 'error') return <h1>Oops, something went wrong</h1>;
  return (
    <div className={style.component__container}>
      <MainButton onClick={() => navigate('/')}>Home</MainButton>
      <form onSubmit={handleSubmit} className={style.form__container}>
        <label>Song Title</label>
        <input
          onChange={handleChange}
          type='text'
          name='title'
          value={songState.title}
          autoComplete='off'
          className={style.form__title}
        />
        <label>Artist Name</label>
        <input
          onChange={handleChange}
          type='text'
          name='artist'
          value={songState.artist}
          autoComplete='off'
          className={style.form__artist}
        />
        <label>Song</label>
        <textarea
          onChange={handleChange}
          type='text'
          name='content'
          value={songState.content}
          autoComplete='off'
          className={style.form__content}
        />
        <MainButton type='submit'>
          {songDetails.status === 'success' ? 'Update' : 'Create'}
        </MainButton>
      </form>
    </div>
  );
}
