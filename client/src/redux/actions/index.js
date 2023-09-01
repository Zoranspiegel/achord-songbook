const { VITE_SERVER_URL } = import.meta.env;

export const LOG_USER = 'LOG_USER';
export const LOGGING_USER = 'LOGGING_USER';
export const LOGGING_USER_ERROR = 'LOGGING_USER_ERROR';
export const LOG_OUT_USER = 'LOG_OUT_USER';

export const CREATE_SONG = 'CREATE_SONG';
export const CREATE_SONG_LOADING = 'CREATE_SONG_LOADING';
export const CREATE_SONG_ERROR = 'CREATE_SONG_ERROR';

export const EDIT_SONG = 'EDIT_SONG';
export const EDIT_SONG_LOADING = 'EDIT_SONG_LOADING';
export const EDIT_SONG_ERROR = 'EDIT_SONG_ERROR';
export const CLEAN_EDIT = 'CLEAN_EDIT';

export const GET_USER_ARTISTS = 'GET_USER_ARTISTS';
export const GET_USER_ARTISTS_LOADING = 'GET_USER_ARTISTS_LOADING';
export const GET_USER_ARTISTS_ERROR = 'GET_USER_ARTISTS_ERROR';

export const GET_USER_SONGS = 'GET_USER_SONGS';
export const GET_USER_SONGS_LOADING = 'GET_USER_SONGS_LOADING';
export const GET_USER_SONGS_ERROR = 'GET_USER_SONGS_ERROR';

export const OPEN_FETCH_GATE = 'OPEN_FETCH_GATE';
export const CLOSE_FETCH_GATE = 'CLOSE_FETCH_GATE';

export const GET_SONG_DETAILS = 'GET_SONG_DETAILS';
export const GET_SONG_DETAILS_LOADING = 'GET_SONG_DETAILS_LOADING';
export const GET_SONG_DETAILS_ERROR = 'GET_SONG_DETAILS_ERROR';
export const CLEAN_DETAILS = 'CLEAN_DETAILS';

export const DELETE_SONG = 'DELETE_SONG';
export const DELETE_SONG_LOADING = 'DELETE_SONG_LOADING';
export const DELETE_SONG_ERROR = 'DELETE_SONG_ERROR';

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
  // CREATE_SONG_LOADING
  dispatch({ type: CREATE_SONG_LOADING });
  const { artist, ...rest } = body;
  console.log(artist);
  fetch(`${VITE_SERVER_URL}/artist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ artist })
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
        // CREATE_SONG
        .then(payload => dispatch({ type: CREATE_SONG, payload }))
        // CREATE_SONG_ERROR
        .catch(error => dispatch({ type: CREATE_SONG_ERROR, payload: error.message }));
    })
    // CREATE_SONG_ERROR
    .catch(error => dispatch({ type: CREATE_SONG_ERROR, payload: error.message }));
};

export const editSong = (id, body, token) => (dispatch) => {
  const { artist, ...rest } = body;
  // EDIT_SONG_LOADING
  dispatch({ type: EDIT_SONG_LOADING });
  fetch(`${VITE_SERVER_URL}/artist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ artist })
  })
    .then((res) => {
      if (!res.ok) throw new Error('Bad Request');
      return res.json();
    })
    .then((artistId) => {
      fetch(`${VITE_SERVER_URL}/song/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...rest, artistId })
      })
        .then((res) => {
          if (!res.ok) throw new Error('Bad Request');
          return res.json();
        })
        // EDIT_SONG
        .then((payload) => dispatch({ type: EDIT_SONG, payload }))
        // EDIT_SONG_ERROR
        .catch((error) => dispatch({ type: EDIT_SONG_ERROR, payload: error.message }));
    })
    // EDIT_SONG_ERROR
    .catch((error) => dispatch({ type: EDIT_SONG_ERROR, payload: error.message }));
};

// CLEAN_EDIT
export const cleanEdit = () => {
  return { type: CLEAN_EDIT };
};

export const getArtists = (token) => (dispatch) => {
  // GET_USER_ARTISTS_LOADING
  dispatch({ type: GET_USER_ARTISTS_LOADING });
  return fetch(`${VITE_SERVER_URL}/artist`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Bad Request');
      return res.json();
    })
    // GET_USER_ARTISTS
    .then(payload => dispatch({ type: GET_USER_ARTISTS, payload }))
    // GET_USER_ARTISTS_ERROR
    .catch(error => dispatch({ type: GET_USER_ARTISTS_ERROR, payload: error.message }));
};

export const getUserSongs = (token) => (dispatch) => {
  // GET_USER_SONGS_LOADING
  dispatch({ type: GET_USER_SONGS_LOADING });
  fetch(`${VITE_SERVER_URL}/song`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Bad Request');
      return res.json();
    })
    // GET_USER_SONGS
    .then(payload => dispatch({ type: GET_USER_SONGS, payload }))
    // GET_USER_SONGS_ERROR
    .catch(error => dispatch({ type: GET_USER_SONGS_ERROR, payload: error.message }));
};

// OPEN_FETCH_GATE
export const openFetchGate = () => {
  return { type: OPEN_FETCH_GATE };
};

// CLOSE_FETCH_GATE
export const closeFetchGate = () => {
  return { type: CLOSE_FETCH_GATE };
};

export const getSongDetails = (id, token) => (dispatch) => {
  // GET_SONG_DETAILS_LOADING
  dispatch({ type: GET_SONG_DETAILS_LOADING });
  fetch(`${VITE_SERVER_URL}/song/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => {
      if (!res.ok) throw new Error('Bad Request');
      return res.json();
    })
    // GET_SONG_DETAILS
    .then(payload => dispatch({ type: GET_SONG_DETAILS, payload }))
    // GET_SONG_DETAILS_ERROR
    .catch((error) => dispatch({ type: GET_SONG_DETAILS_ERROR, payload: error.message }));
};

// CLEAN_DETAILS
export const cleanDetails = () => {
  return { type: CLEAN_DETAILS };
};

export const deleteSong = (id, token) => (dispatch) => {
  // DELETE_SONG_LOADING
  dispatch({ type: DELETE_SONG });
  fetch(`${VITE_SERVER_URL}/song/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error('Bad Request');
      return res.json();
    })
    // DELETE_SONG
    .then(payload => dispatch({ type: DELETE_SONG, payload }))
    // DELETE_SONG_ERROR
    .catch(error => dispatch({ type: DELETE_SONG_ERROR, payload: error.message }));
};
