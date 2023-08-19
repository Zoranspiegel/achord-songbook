import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default function MyAuthProvider({ children }) {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
    } else {
      console.log('Not logged');
    }
  }, [isAuthenticated, user]);

  return (
    <>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      {children}
    </>
  );
}

MyAuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
