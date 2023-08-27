import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import Chord from './Chord';
import style from './styles/ChordPlacer.module.css';

export default function ChordPlacer({ name }) {
  const inputRef = useRef(null);
  const [visibilityState, setVisibilityState] = useState(false);
  const [inputState, setInputState] = useState('');
  const [chordState, setChordState] = useState('');

  useEffect(() => {
    if (!chordState && inputRef && visibilityState) {
      inputRef.current.focus();
    }
  }, [visibilityState]);

  const handleVisibility = () => {
    setVisibilityState(!visibilityState);
  };

  const handleInputStateChange = (e) => {
    setInputState(e.target.value);
  };

  const handleChordStateSubmit = (e) => {
    e.preventDefault();
    setChordState(inputState);
    setInputState('');
  };

  return (
    <div className={style.chordplacer__container}>
      <span onClick={handleVisibility} className={visibilityState ? style.chordplacer__chord_active : style.chordplacer__chord}>
        {name}&nbsp;
      </span>
      {!chordState && visibilityState && (
        <form
          onSubmit={handleChordStateSubmit}
          className={style.chordplacer__form}
        >
          <input
            type='text'
            ref={inputRef}
            maxLength={6}
            className={style.form__input}
            value={inputState}
            onChange={handleInputStateChange}
          />
          <button className={style.form__submit} type="submit" disabled={!/[0-9x]{6}$/.test(inputState)} >&#9834;</button>
        </form>
      )}
      {chordState && visibilityState && (
        <Chord name={name} chord={chordState} />
      )}
    </div>
  );
}

ChordPlacer.propTypes = {
  name: PropTypes.string.isRequired,
};
