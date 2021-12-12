const initialState = {
  isLoading: false,
  reserve: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_RESERVE":
    case "SET_RESERVE_SUCCESS":
      return {
        ...state, 
        isLoading: true,
        reserve: action.reserve
        };
    case "SET_RESERVE_FAIL":
      return{
        ...initialState,
        error: action.error,
      }
    default:
      return state;
  }
};