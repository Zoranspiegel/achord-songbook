import { useAuth0 } from '@auth0/auth0-react';
import MainButton from './MainButton';

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return <MainButton onClick={handleLogin}>Login</MainButton>;
}
