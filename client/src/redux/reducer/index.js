import {
  LOG_USER,
  LOGGING_USER,
  LOGGING_USER_ERROR,
  LOG_OUT_USER,
  CREATE_SONG,
  CREATE_SONG_LOADING,
  CREATE_SONG_ERROR,
  EDIT_SONG,
  EDIT_SONG_LOADING,
  EDIT_SONG_ERROR,
  CLEAN_EDIT,
  GET_USER_ARTISTS,
  GET_USER_ARTISTS_LOADING,
  GET_USER_ARTISTS_ERROR,
  GET_USER_SONGS,
  GET_USER_SONGS_LOADING,
  GET_USER_SONGS_ERROR,
  OPEN_FETCH_GATE,
  CLOSE_FETCH_GATE,
  GET_SONG_DETAILS,
  GET_SONG_DETAILS_LOADING,
  GET_SONG_DETAILS_ERROR,
  CLEAN_DETAILS,
  DELETE_SONG,
  DELETE_SONG_LOADING,
  DELETE_SONG_ERROR
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
  editedSong: {
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
  },
  fetchGate: true,
  songDetails: {
    data: {},
    status: 'idle',
    error: null
  },
  deletedSong: {
    id: null,
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
    case EDIT_SONG_LOADING:
      return {
        ...state,
        editedSong: {
          id: null,
          status: 'loading',
          error: null
        }
      };
    case EDIT_SONG:
      return {
        ...state,
        editedSong: {
          id: action.payload,
          status: 'success',
          error: null
        }
      };
    case EDIT_SONG_ERROR:
      return {
        ...state,
        editedSong: {
          id: null,
          status: 'error',
          error: action.payload
        }
      };
    case CLEAN_EDIT:
      return {
        ...state,
        editedSong: initialState.editedSong
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
    case OPEN_FETCH_GATE:
      return { ...state, fetchGate: true };
    case CLOSE_FETCH_GATE:
      return { ...state, fetchGate: false };
    case GET_SONG_DETAILS_LOADING:
      return {
        ...state,
        songDetails: {
          data: {},
          status: 'loading',
          error: null
        }
      };
    case GET_SONG_DETAILS:
      return {
        ...state,
        songDetails: {
          data: action.payload,
          status: 'success',
          error: null
        }
      };
    case GET_SONG_DETAILS_ERROR:
      return {
        ...state,
        songDetails: {
          data: {},
          status: 'error',
          error: action.payload
        }
      };
    case CLEAN_DETAILS:
      return {
        ...state,
        songDetails: initialState.songDetails
      };
    case DELETE_SONG_LOADING:
      return {
        ...state,
        deletedSong: {
          id: null,
          status: 'loading',
          error: null
        }
      };
    case DELETE_SONG:
      return {
        ...state,
        deletedSong: {
          id: action.payload,
          status: 'loading',
          error: null
        }
      };
    case DELETE_SONG_ERROR:
      return {
        ...state,
        deletedSong: {
          id: null,
          status: 'error',
          error: action.payload
        }
      };
    default:
      return { ...state };
  }
}
