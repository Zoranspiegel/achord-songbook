import {
  LOG_USER,
  LOGGING_USER,
  LOGGING_USER_ERROR,
  LOG_OUT_USER,
  CREATE_SONG,
  CREATE_SONG_LOADING,
  CREATE_SONG_ERROR
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
    default:
      return { ...state };
  }
}
