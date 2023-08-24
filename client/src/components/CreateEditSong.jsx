import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSong } from '../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';
import style from './styles/CreateEditSong.module.css';

const initialSongState = {
  title: '',
  artistName: '',
  content: '',
};

export default function CreateEditSong() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.loggedUser.data.token);
  const [songState, setSongState] = useState(initialSongState);

  useEffect(() => {
    console.log(id);
  }, []);

  const handleChange = (e) => {
    setSongState({
      ...songState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSong(songState, token));
    setSongState(initialSongState);
    localStorage.setItem('fetchGate', false);
    navigate('/');
  };

  return (
    <form className={style.form__container} onSubmit={handleSubmit}>
      <label>Song Title</label>
      <input
        onChange={handleChange}
        type='text'
        name='title'
        value={songState.title}
        autoComplete="off"
      />
      <label>Artist Name</label>
      <input
        onChange={handleChange}
        type='text'
        name='artistName'
        value={songState.artistName}
        autoComplete="off"
      />
      <label>Song</label>
      <textarea
        onChange={handleChange}
        type='text'
        name='content'
        value={songState.content}
        autoComplete="off"
      />
      <input type='submit' value='Create' />
    </form>
  );
}
