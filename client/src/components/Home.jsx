import logo from '../assets/achord_logo.png';
import User from './User';
import style from './styles/Home.module.css';

export default function Home() {
  return (
    <div className={style.home__container}>
      <img className={style.home__logo} src={logo} alt='A/Chord logo' />
      <User />
    </div>
  );
}
