const initialState = {
  isLoading: false,
  reserves: null,
  error: null,
  review: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_RESERVES":
    case "GET_RESERVES_SUCCESS":
      return {
        ...state, 
        isLoading: true,
        reserves: action.reserves
        };
    case "GET_RESERVES_FAIL":
      return{
        ...initialState,
        error: action.error,
      }
    case "UPDATE_RESERVE":
    case "UPDATE_RESERVE_SUCCESS":
    case "GET_RESERVE_FAIL":
      return{
        ...initialState,
        error: action.error,
      }
    case "SET_REVIEW":
    case "SET_REVIEW_SUCCESS":
      return {
        ...state, 
        isLoading: true,
        };
    case "SET_REVIEW_FAIL":
      return{
        ...initialState,
        error: action.error,
      }
    case "GET_REVIEW":
    case "GET_REVIEW_SUCCESS":
      return {
        ...state, 
        isLoading: true,
        review: action.review,
        };
    case "GET_REVIEW_FAIL":
      return{
        ...initialState,
        error: action.error,
      }
    case "UPDATE_REVIEW":
    case "UPDATE_REVIEW_SUCCESS":
      return {
        ...state, 
        isLoading: true,
        };
    case "UPDATE_REVIEW_FAIL":
      return{
        ...initialState,
        error: action.error,
      }
    default:
      return state;
  }
};