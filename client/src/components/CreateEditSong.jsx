import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSong } from '../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';
import style from './styles/CreateSong.module.css';

const initialSongState = {
  title: '',
  artistName: '',
  content: '',
};

export default function CreateEditSong() {
  const dispatch = useDispatch();
  const [songState, setSongState] = useState(initialSongState);
  const token = useSelector((state) => state.loggedUser.data.token);
  const { id } = useParams();
  const navigate = useNavigate();

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
      />
      <label>Artist Name</label>
      <input
        onChange={handleChange}
        type='text'
        name='artistName'
        value={songState.artistName}
      />
      <label>Song</label>
      <input
        onChange={handleChange}
        type='text'
        name='content'
        value={songState.content}
      />
      <input type='submit' value='Create' />
    </form>
  );
}
