import PropTypes from 'prop-types';
import style from './styles/MainButton.module.css';

export default function MainButton(props) {
  return <button {...props} className={style.button__component}>{props.children}</button>;
}

MainButton.propTypes = {
  children: PropTypes.any.isRequired,
};
