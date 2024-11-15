import { useAuth0 } from '@auth0/auth0-react';
import MainButton from './MainButton';
import { logOutTestUser } from '../redux/actions';
import { useDispatch } from 'react-redux'; 

export default function LogoutButton() {
  const dispatch = useDispatch();
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    dispatch(logOutTestUser());
  };

  return <MainButton onClick={handleLogout}>Logout</MainButton>;
}
