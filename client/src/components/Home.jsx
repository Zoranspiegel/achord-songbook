import logo from '../assets/achord_logo.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import User from './User';
import Songs from './Songs';
import style from './styles/Home.module.css';

export default function Home() {
  const logged = useSelector(state => state.loggedUser.status === 'logged');
  const navigate = useNavigate();

  return (
    <div className={style.home__container}>
      <img className={style.home__logo} src={logo} alt='A/Chord logo' />
      <User />
      {logged && <Songs />}
      {logged && <button onClick={() => navigate('/song/edit/new')}>New Song</button>}
    </div>
  );
}
