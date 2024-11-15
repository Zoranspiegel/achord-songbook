import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { logUser, logoutUser } from '../redux/actions';

export default function MyAuthProvider({ children }) {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const testUser = useSelector((state) => state.testUser);
  const { isAuthenticated, isLoading, user } = useAuth0();

  useEffect(() => {
    console.log('STATUS: ', loggedUser.status);
    console.log('TEST_USER_STATUS: ', testUser);
  }, [loggedUser]);

  useEffect(() => {
    if (
      !isAuthenticated &&
      !isLoading &&
      loggedUser.status === 'guest' &&
      testUser.status === 'online'
    ) {
      console.log('LOGING_TEST_USER');
      const body = {
        auth0_sub: 'auth0|6736f066b791e9850005c2b3',
        nickname: 'Test User',
        email: 'testuser@gmail.com',
        profile_picture: 'https://cdn.auth0.com/avatars/te.png'
      };
      dispatch(logUser(body));
    } else if (isAuthenticated && !isLoading && loggedUser.status === 'guest') {
      const body = {
        auth0_sub: user.sub,
        name: user.given_name,
        nickname: user.nickname,
        email: user.email,
        profile_picture: user.picture
      };
      dispatch(logUser(body));
      console.log('Logged');
    } else if (
      testUser.status === 'offline' &&
      !isAuthenticated &&
      !isLoading &&
      loggedUser.status !== 'guest'
    ) {
      dispatch(logoutUser());
      console.log('Not logged');
    }
    // eslint-disable-next-line
  }, [isAuthenticated, isLoading, user, loggedUser, testUser]);

  return <>{children}</>;
}

MyAuthProvider.propTypes = {
  children: PropTypes.any.isRequired
};
