import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchByArtist, clearSearch } from '../redux/actions';
import anyHash from '../utils/anyHash';
import style from './styles/SearchByArtist.module.css';

export default function SearchByArtist() {
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  const [searchState, setSearchState] = useState('');
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const allArtists = useSelector((state) => state.userArtists.data);
  const hasSongsByName = useSelector((state) => state.searchByName.status === 'success');
  const token = useSelector((state) => state.loggedUser.data.token);

  useEffect(() => {
    if (hasSongsByName) {
      setSearchState('');
      setSearchFocused(false);
    }
  }, [hasSongsByName]);

  useEffect(() => {
    if(searchState) {
      setFilteredArtists([...allArtists.filter(artist => artist.name.toLowerCase().startsWith(searchState.toLowerCase()))]);
    } else {
      setFilteredArtists([]);
    }
  }, [searchState]);

  const handleChange = (e) => {
    dispatch(clearSearch());
    setSearchState(e.target.value);
  };

  const handleOpenInput = () => {
    setSearchFocused(true);
    searchInput.current.focus();
  };

  const handleCloseInput = () => {
    setSearchState('');
    setSearchFocused(false);
  };

  const handleSearch = (artistId) => {
    dispatch(searchByArtist(artistId, token));
    setSearchFocused(false);
    setSearchState('');
  };

  return (
    <div className={style.search__container} style={!searchState ? { zIndex: '0' } : null}>
      <div className={style.search__plate}>
        <label className={style.search__label}>Search By Artist</label>
        <div className={style.input__container}>
          <input
            className={style.search__input}
            ref={searchInput}
            onChange={handleChange}
            type='text'
            value={searchState}
            onBlur={searchState.length ? null : handleCloseInput}
          />
          <div className={searchFocused ? style.input__opened : style.input__closed} onClick={handleOpenInput}></div>
        </div>
      </div>
      <div className={style.list__container}>
        <ul className={searchState ? style.artists__list_shown : style.artists__list_hidden}>
          {filteredArtists.length ? <li className={style.artists__item}>&nbsp;</li> : null}
          {filteredArtists?.map(artist => (
            <li className={style.artists__item} key={anyHash()} onClick={() => handleSearch(artist.id)}>{artist.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}