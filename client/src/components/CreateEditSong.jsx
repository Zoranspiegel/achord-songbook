import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSong } from '../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';
import isUUID from '../utils/isUUID';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (songDetails.status === 'success') {
      console.log('Song update under develop');
    }
    if (songDetails.status === 'idle') {
      dispatch(createSong(songState, token));
      setSongState(initialSongState);
      localStorage.setItem('fetchGate', false);
      navigate('/');
    }
  };

  return (
    <div className={style.component__container}>
      <button onClick={() => navigate('/')}>Home</button>
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
        <input
          type='submit'
          value={songDetails.status === 'success' ? 'Update' : 'Create'}
        />
      </form>
    </div>
  );
}
