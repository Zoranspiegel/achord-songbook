import {
  LOG_USER,
  LOGGING_USER,
  LOGGING_USER_ERROR,
  LOG_OUT_USER
} from '../actions';

const initialState = {
  loggedUser: {
    data: {},
    status: 'guest',
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
        ...state,
        loggedUser: initialState.loggedUser
      };
    default:
      return { ...state };
  }
}
