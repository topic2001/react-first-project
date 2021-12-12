const initialState = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
  email: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "AUTH_START":
      return {
        ...state,
        error: null,
      }
    case "LOGOUT_START":
      return {
        ...state,
        isLoading: true,
      };
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        email: payload.email,
        user: payload,
      };
    case "AUTH_STATE":
      console.log("사가 리듀서")
    case "AUTH_STATE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: payload,
      };
    case "AUTH_STATE_FAIL":
      return {
        ...initialState,
        error: payload,
      };
    case "AUTH_FAIL":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isLoading: false,
        error: payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...initialState,
      };
    case "LOGOUT_FAIL": {
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    }
    case "ERROR_RESET":
      return {
        ...state,
        error: null,
      };
    case "USER_UPDATE_START":
    case "EMAIL_UPDATE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        // user,
        // email,
      }
      case "PASS_UPDATE_SUCCESS":
      case "UPDATE_FAIL": {
        return {
          ...state,
          isLoading: false,
          error: payload,
        };
      }
      case "USERDEL_SUCCESS":
        return{
          ...initialState,
        }
    default:
      return state;
  }
};