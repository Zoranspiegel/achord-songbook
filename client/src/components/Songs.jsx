import { useDispatch, useSelector } from 'react-redux';
import { getArtists, getUserSongs } from '../redux/actions';
import style from './styles/Songs.module.css';

export default function Songs() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.loggedUser.data.token);

  return (
    <div className={style.songs__container}>
      <h1>Songs</h1>
      <button onClick={() => dispatch(getArtists(token))}>Get Artists</button>
      <button onClick={() => dispatch(getUserSongs(token))}>Get Songs</button>
    </div>
  );
}
