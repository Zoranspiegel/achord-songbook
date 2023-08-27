import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cleanEdit, createSong, editSong } from '../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    if (isUUID(id) && songDetails.status === 'success') {
      const { title, artist, content } = songDetails.data;
      const editState = { title, artist, content };
      setSongState(editState);
    }
  }, []);

  const handleChange = (e) => {
    setSongState({
      ...songState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (edited === 'success') navigate(`/song/details/${id}`);
    return () => {
      if (edited === 'success') dispatch(cleanEdit());
    };
  }, [edited]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (songDetails.status === 'success') {
      console.log('Song update under develop');
      dispatch(editSong(id, songState, token));
      setSongState(initialSongState);
      localStorage.setItem('fetchGate', false);
    }
    if (songDetails.status === 'idle') {
      dispatch(createSong(songState, token));
      setSongState(initialSongState);
      localStorage.setItem('fetchGate', false);
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
        <MainButton type='submit'>{songDetails.status === 'success' ? 'Update' : 'Create'}</MainButton>
      </form>
    </div>
  );
}
