import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearSearch, searchByName } from '../redux/actions';
import style from './styles/SearchByName.module.css';

export default function SearchByName() {
  const dispatch = useDispatch();
  const [searchState, setSearchState] = useState('');

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

  return (
    <div className={style.search__container}>
      <label className={style.search__label}>Search By Name</label>
      <input className={style.search__input} onChange={handleChange} type='text' value={searchState}/>
    </div>
  );
}