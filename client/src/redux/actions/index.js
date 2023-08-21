const { VITE_SERVER_URL } = import.meta.env;

export const LOG_USER = 'LOG_USER';
export const LOGGING_USER = 'LOGGING_USER';
export const LOGGING_USER_ERROR = 'LOGGING_USER_ERROR';
export const LOG_OUT_USER = 'LOG_OUT_USER';

export const CREATE_SONG = 'CREATE_SONG';
export const CREATE_SONG_LOADING = 'CREATE_SONG_LOADING';
export const CREATE_SONG_ERROR = 'CREATE_SONG_ERROR';

export const logUser = (body) => (dispatch) => {
  // LOGGING_USER
  dispatch({ type: LOGGING_USER });
  fetch(`${VITE_SERVER_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) throw new Error('Bad Request');
      return res.json();
    })
    // LOG_USER
    .then(payload => dispatch({ type: LOG_USER, payload }))
    // LOGGING_USER_ERROR
    .catch(error => dispatch({ type: LOGGING_USER_ERROR, payload: error.message }));
};

// LOG_OUT_USER
export const logoutUser = () => {
  return { type: LOG_OUT_USER };
};

export const createSong = (body, token) => (dispatch) => {
  dispatch({ type: CREATE_SONG_LOADING });
  const { artistName, ...rest } = body;
  fetch(`${VITE_SERVER_URL}/artist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ artistName })
  })
    .then(res => {
      if (!res.ok) throw new Error('Bad Request');
      return res.json();
    })
    .then(artistId => {
      fetch(`${VITE_SERVER_URL}/song`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...rest, artistId })
      })
        .then(res => {
          if (!res.ok) throw new Error('Bad Request');
          return res.json();
        })
        .then(payload => dispatch({ type: CREATE_SONG, payload }))
        .catch(error => dispatch({ type: CREATE_SONG_ERROR, payload: error.message }));
    })
    .catch(error => dispatch({ type: CREATE_SONG_ERROR, payload: error.message }));
};
