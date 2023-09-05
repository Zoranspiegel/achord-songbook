import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { clearSearch, searchByName } from '../redux/actions';
import style from './styles/SearchByName.module.css';

export default function SearchByName() {
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const [searchState, setSearchState] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const handleChange = (e) => {
    setSearchState(e.target.value);
  };

  useEffect(() => {
    if (searchState) {
      dispatch(searchByName(searchState));
    } else {
      dispatch(clearSearch());
    }
  }, [searchState]);

  const handleOpenInput = () => {
    setSearchFocused(true);
    searchInput.current.focus();
  };

  const handleCloseInput = () => {
    setSearchFocused(false);
  };

  return (
    <div className={style.search__container}>
      <label className={style.search__label}>Search By Name</label>
      <div className={style.input__container}>
        <input
          className={style.search__input}
          ref={searchInput}
          onChange={handleChange}
          type='text'
          value={searchState}
          onBlur={handleCloseInput}
        />
        <div className={searchFocused ? style.input__opened : style.input__closed} onClick={handleOpenInput}></div>
      </div>
    </div>
  );
}
