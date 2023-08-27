import { useRef, useEffect } from 'react';
// import Tilt from 'react-parallax-tilt';
import PropTypes from 'prop-types';
import style from './styles/Chord.module.css';

export default function Chord({ name, chord }) {
  const canvas = useRef(null);

  useEffect(() => {
    const MIN_FRET = chord
      .split('')
      .filter((note) => note !== 'x' && note !== '0')
      .sort((a, b) => a - b)[0];
    const MAX_FRET = chord
      .split('')
      .filter((note) => note !== 'x' && note !== '0')
      .sort((a, b) => b - a)[0];
    const FIRST_POSITION = MAX_FRET <= 5;
    const CANVAS = canvas.current;
    const ctx = CANVAS.getContext('2d');

    function drawChord() {
      if (window.innerWidth >= 1250) {
        CANVAS.width = window.innerWidth * 0.06;
        CANVAS.height = CANVAS.width;
      } else {
        CANVAS.width = 70;
        CANVAS.height = CANVAS.width;
      }

      const NAME_COLOR = 'red';
      const CHORD_COLOR = 'black';

      const XMARGIN = CANVAS.width * 0.3;
      const YMARGIN = CANVAS.height * 0.04;
      const TOP_PADDING = CANVAS.height * 0.2;
      const NAME_SIZE = CANVAS.width * 0.14;
      const MUTEOPEN_SIZE = CANVAS.width * 0.15;
      const POSITION_SIZE = CANVAS.width * 0.15;
      const STR_WIDTH = CANVAS.width * 0.02;
      const STRS_SPACE = (CANVAS.width - XMARGIN * 2) / 5;
      const EXTENSION = FIRST_POSITION ? 0 : STR_WIDTH * 2.3;
      const FRET_WIDTH = CANVAS.width * 0.02;
      const FRETS_SPACE = (CANVAS.height - YMARGIN * 2) / 5 - STR_WIDTH * 2.3;
      const NUT_WIDTH = FIRST_POSITION ? FRET_WIDTH * 2 : FRET_WIDTH;
      const NUT_FIX = FIRST_POSITION ? NUT_WIDTH * 0.2 : 0;
      const NOTE_RADIUS = CANVAS.width * 0.033;

      ctx.translate(0, CANVAS.height * 0.04);

      //NAME
      ctx.font = `bold ${NAME_SIZE}px Arial`;
      ctx.fillStyle = NAME_COLOR;
      ctx.fillText(
        `${name}`,
        CANVAS.width / 2 - name.length * (NAME_SIZE * 0.35),
        (YMARGIN + TOP_PADDING) * 0.3
      );

      //STRINGS
      ctx.strokeStyle = CHORD_COLOR;
      ctx.lineWidth = STR_WIDTH;
      for (let string = 1; string <= 6; string++) {
        ctx.beginPath();
        ctx.moveTo(
          XMARGIN + STRS_SPACE * (string - 1),
          YMARGIN - EXTENSION + TOP_PADDING
        );
        ctx.lineTo(
          XMARGIN + STRS_SPACE * (string - 1),
          CANVAS.height - YMARGIN
        );
        ctx.stroke();
        ctx.closePath();
      }

      //NUT
      ctx.strokeStyle = CHORD_COLOR;
      ctx.lineWidth = NUT_WIDTH;
      ctx.beginPath();
      ctx.moveTo(XMARGIN - NUT_FIX, YMARGIN + TOP_PADDING - NUT_FIX);
      ctx.lineTo(
        CANVAS.width - XMARGIN + NUT_FIX,
        YMARGIN + TOP_PADDING - NUT_FIX
      );
      ctx.stroke();
      ctx.closePath();

      //FRETS
      ctx.strokeStyle = CHORD_COLOR;
      ctx.lineWidth = FRET_WIDTH;
      for (let fret = 1; fret <= 5; fret++) {
        ctx.beginPath();
        ctx.moveTo(XMARGIN, YMARGIN + TOP_PADDING + FRETS_SPACE * fret);
        ctx.lineTo(
          CANVAS.width - XMARGIN,
          YMARGIN + TOP_PADDING + FRETS_SPACE * fret
        );
        ctx.stroke();
        ctx.closePath();
      }

      //MUTE/OPEN
      chord.split('').forEach((note, string) => {
        ctx.font = `${MUTEOPEN_SIZE}px Arial`;
        ctx.fillStyle = CHORD_COLOR;
        const symbol = note === '0' ? 'o' : note;
        if (symbol === 'x' || symbol === 'o') {
          ctx.fillText(
            `${symbol}`,
            XMARGIN + STRS_SPACE * string - MUTEOPEN_SIZE * 0.3,
            (YMARGIN + TOP_PADDING) * 0.88 - EXTENSION / 2
          );
        }
      });

      //POSITION
      if (!FIRST_POSITION) {
        ctx.font = `${POSITION_SIZE}px Arial`;
        ctx.fillStyle = CHORD_COLOR;
        ctx.fillText(
          `${MIN_FRET}`,
          XMARGIN * 0.6,
          YMARGIN + TOP_PADDING + FRETS_SPACE * 0.7
        );
      }

      //NOTES
      chord.split('').forEach((fret, string) => {
        if (fret !== 'x' && fret !== '0') {
          ctx.beginPath();
          ctx.arc(
            XMARGIN + STRS_SPACE * string,
            YMARGIN +
              TOP_PADDING +
              FRETS_SPACE * (fret - MIN_FRET) +
              FRETS_SPACE / 2,
            NOTE_RADIUS,
            0,
            6.3
          );
          ctx.fill();
          ctx.closePath();
        }
      });

      //BAR
      if (
        chord.split('').filter((note) => note !== 'x' && note !== '0').length >
        4
      ) {
        const barFret = chord
          .split('')
          .filter((note) => note !== 'x' && note !== '0')
          .sort((a, b) => a - b)[0];
        const initialPosition = chord.split('').indexOf(barFret);
        const finalPosition = Math.abs(
          chord.split('').reverse().indexOf(barFret) - 5
        );
        ctx.beginPath();
        ctx.strokeStyle = CHORD_COLOR;
        ctx.lineWidth = NOTE_RADIUS * 2;
        ctx.moveTo(
          XMARGIN + STRS_SPACE * initialPosition,
          YMARGIN +
            TOP_PADDING +
            (FRETS_SPACE * (barFret - MIN_FRET) + FRETS_SPACE * 0.5)
        );
        ctx.lineTo(
          XMARGIN + STRS_SPACE * finalPosition,
          YMARGIN +
            TOP_PADDING +
            (FRETS_SPACE * (barFret - MIN_FRET) + FRETS_SPACE * 0.5)
        );
        ctx.stroke();
        ctx.closePath();
      }
    }
    drawChord();
    window.addEventListener('resize', drawChord);
    console.log('NAME: ', name, 'CHORD: ', chord);
  }, [chord, name]);

  return (
      <div className={style.chord__container}>
        <canvas className={style.chord__canvas} ref={canvas}></canvas>
      </div>
  );
}

Chord.propTypes = {
  chord: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
