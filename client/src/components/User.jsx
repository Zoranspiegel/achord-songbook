import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import style from './styles/User.module.css';
import TestUserButton from './TestUserButton';

export default function User() {
  const loggedUser = useSelector((state) => state.loggedUser);

  if (loggedUser.status === 'loading') return null;
  return (
    <div className={style.user__container}>
      {loggedUser.status === 'logged' && (
        <div className={style.userdata__container}>
          <h1 className={style.userdata__name}>{loggedUser.data.name ? loggedUser.data.name : loggedUser.data.nickname}</h1>
          <img className={style.userdata__picture} src={loggedUser.data.profile_picture} alt={loggedUser.data.nickname} />
        </div>
      )}
      {loggedUser.status === 'guest' ? <LoginButton /> : <LogoutButton />}
      {loggedUser.status === 'guest' && <TestUserButton />}
    </div>
  );
}
