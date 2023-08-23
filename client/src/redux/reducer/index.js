import {
  LOG_USER,
  LOGGING_USER,
  LOGGING_USER_ERROR,
  LOG_OUT_USER,
  CREATE_SONG,
  CREATE_SONG_LOADING,
  CREATE_SONG_ERROR,
  GET_USER_ARTISTS,
  GET_USER_ARTISTS_LOADING,
  GET_USER_ARTISTS_ERROR,
  GET_USER_SONGS,
  GET_USER_SONGS_LOADING,
  GET_USER_SONGS_ERROR,
} from '../actions';

const initialState = {
  loggedUser: {
    data: {},
    status: 'guest',
    error: null
  },
  newSong: {
    id: null,
    status: 'idle',
    error: null
  },
  userArtists: {
    data: [],
    status: 'idle',
    error: null
  },
  userSongs: {
    data: [],
    status: 'idle',
    error: null
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGGING_USER:
      return {
        ...state,
        loggedUser: {
          data: {},
          status: 'loading',
          error: null
        }
      };
    case LOG_USER:
      return {
        ...state,
        loggedUser: {
          data: action.payload,
          status: 'logged',
          error: null
        }
      };
    case LOGGING_USER_ERROR:
      return {
        ...state,
        loggedUser: {
          data: {},
          status: 'error',
          error: action.payload
        }
      };
    case LOG_OUT_USER:
      return {
        ...initialState
      };
    case CREATE_SONG_LOADING:
      return {
        ...state,
        newSong: {
          id: null,
          status: 'loading',
          error: null
        }
      };
    case CREATE_SONG:
      return {
        ...state,
        newSong: {
          id: action.payload,
          status: 'success',
          error: null
        }
      };
    case CREATE_SONG_ERROR:
      return {
        ...state,
        newSong: {
          id: null,
          status: 'error',
          error: action.payload
        }
      };
    case GET_USER_SONGS_LOADING:
      return {
        ...state,
        userSongs: {
          data: [],
          status: 'loading',
          error: null
        }
      };
    case GET_USER_SONGS:
      return {
        ...state,
        userSongs: {
          data: action.payload,
          status: 'success',
          error: null
        }
      };
    case GET_USER_SONGS_ERROR:
      return {
        ...state,
        userSongs: {
          data: [],
          status: 'error',
          error: action.payload
        }
      };
    case GET_USER_ARTISTS_LOADING:
      return {
        ...state,
        userArtists: {
          data: [],
          status: 'loading',
          error: null
        }
      };
    case GET_USER_ARTISTS:
      return {
        ...state,
        userArtists: {
          data: action.payload,
          status: 'success',
          error: null
        }
      };
    case GET_USER_ARTISTS_ERROR:
      return {
        ...state,
        userArtists: {
          data: [],
          status: 'error',
          error: action.payload
        }
      };
    default:
      return { ...state };
  }
}
