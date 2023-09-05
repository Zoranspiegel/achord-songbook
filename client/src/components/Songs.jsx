import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtists, getUserSongs, closeFetchGate } from '../redux/actions';
import SongCard from './SongCard';
import anyHash from '../utils/anyHash';
import timeLapse from '../utils/timeLapse';
import style from './styles/Songs.module.css';

export default function Songs() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loggedUser.data.token);
  const userSongs = useSelector((state) => {
    if (state.searchByName.status === 'success') {
      return state.searchByName.data;
    } else {
      return state.userSongs.data
        .sort((a, b) => timeLapse(a.updatedAt) - timeLapse(b.updatedAt))
        .slice(0, 8);
    }
  });
  const newSong = useSelector((state) => state.newSong);
  const fetchGate = useSelector((state) => state.fetchGate);

  useEffect(() => {
    if (newSong.status !== 'loading' && fetchGate) {
      dispatch(getArtists(token));
      dispatch(getUserSongs(token));
      dispatch(closeFetchGate());
    }
  }, [newSong]);

  useEffect(() => {}, []);

  return (
    <div className={style.songs__container}>
      {userSongs?.map((song) => (
        <SongCard key={anyHash()} song={song} />
      ))}
    </div>
  );
}
