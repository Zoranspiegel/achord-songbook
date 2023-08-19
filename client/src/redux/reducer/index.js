const initialState = {
  loggedUser: {
    data: {},
    status: 'guest',
    error: null
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
