import logo from '../assets/achord_logo.png';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cleanDetails } from '../redux/actions';
import { useNavigate } from 'react-router-dom';
import User from './User';
import Songs from './Songs';
import MainButton from './MainButton';
import style from './styles/Home.module.css';
import SearchByName from './SearchByName';

export default function Home() {
  const dispatch = useDispatch();
  const logged = useSelector(state => state.loggedUser.status === 'logged');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(cleanDetails());
  }, []);

  return (
    <div className={logged ? style.home__container : style.home__container_centered}>
      <img className={style.home__logo} src={logo} alt='A/Chord logo' />
      <User />
      {logged && <SearchByName />}
      {logged && <Songs />}
      {logged && <MainButton onClick={() => navigate('/song/edit/new')}>New Song</MainButton>}
    </div>
  );
}
