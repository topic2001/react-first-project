const initialState = {
    hotels: null,
    error: null,
  };

export default (state = initialState, action) => {
    switch (action.type) {
      case "GET_HOTELS":
      case "GET_HOTELS_SUCCESS":
        return {
            ...state, 
            hotels: action.hotels
            };
      default:
        return state;
    }
  };