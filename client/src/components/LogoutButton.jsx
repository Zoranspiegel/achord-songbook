import { useAuth0 } from '@auth0/auth0-react';
import MainButton from './MainButton';

export default function LogoutButton() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return <MainButton onClick={handleLogout}>Logout</MainButton>;
}
