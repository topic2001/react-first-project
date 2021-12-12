const initialState = {
  isLoading: false,
  hotel: null,
  reviews: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_HOTEL":
    case "GET_HOTEL_SUCCESS":
      return {
          ...state, 
          isLoading: true,
          hotel: action.hotel
          };
    case "GET_HOTEL_FAIL":
      return{
        ...initialState,
        error: action.error,
      }
    case "GET_REVIEWS":
    case "GET_REVIEWS_SUCCESS":
      return {
          ...state, 
          isLoading: true,
          reviews: action.reviews
          };
    case "GET_REVIEWS_FAIL":
      return{
        ...initialState,
        error: action.error,
      }
    default:
      return state;
  }
};