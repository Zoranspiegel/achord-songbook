import { logTestUser } from '../redux/actions';
import MainButton from './MainButton';
import { useDispatch } from 'react-redux';

export default function TestUserButton() {
  const dispatch = useDispatch();
  const handleLogTestUser = () => {
    dispatch(logTestUser());
  };

  return <MainButton onClick={handleLogTestUser}>Test User</MainButton>;
}
