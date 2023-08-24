import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSongDetails, cleanDetails } from '../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';
import style from './styles/SongDetails.module.css';

export default function SongDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.loggedUser.data.token);
  const songDetails = useSelector((state) => state.songDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSongDetails(id, token));
    return () => dispatch(cleanDetails());
  }, []);

  if (songDetails.status === 'loading') return null;
  if (songDetails.status === 'error')
    return <h1>Opps, it seems we have a problem :C </h1>;
  if (songDetails.status === 'success')
    return (
      <div className={style.details__container}>
        <button onClick={() => navigate('/')}>Home</button>
        <div className={style.details__plate}>
          <h1 className={style.details__title}>{songDetails.data.title}</h1>
          <h2 className={style.details__artist}>{songDetails.data.artist}</h2>
          <p className={style.details__content}>{songDetails.data.content}</p>
        </div>
      </div>
    );
}
