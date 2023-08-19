const { VITE_SERVER_URL } = import.meta.env;

export const LOG_USER = 'LOG_USER';
export const LOGGING_USER = 'LOGGING_USER';
export const LOGGING_USER_ERROR = 'LOGGING_USER_ERROR';
export const LOG_OUT_USER = 'LOG_OUT_USER';

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
