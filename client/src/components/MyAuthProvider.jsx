import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { logUser, logoutUser } from '../redux/actions';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

export default function MyAuthProvider({ children }) {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.loggedUser);
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    console.log('STATUS: ', loggedUser.status);
  }, [loggedUser]);

  useEffect(() => {
    if (isAuthenticated && !isLoading && loggedUser.status === 'guest') {
      const body = {
        auth0_sub: user.sub,
        nickname: user.nickname,
        email: user.email,
        profile_picture: user.picture
      };
      dispatch(logUser(body));
      console.log('Logged');
    } else if (!isAuthenticated && !isLoading && loggedUser.status !== 'guest') {
      dispatch(logoutUser());
      console.log('Not logged');
    }
    // eslint-disable-next-line
  }, [isAuthenticated, isLoading, user, loggedUser]);

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
