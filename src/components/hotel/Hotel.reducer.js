const today = new Date();
const tomorrow = new Date(today.setDate(today.getDate() + 1));

const initialState = {
    location: ['강남', '역삼', '삼성', '신사', '청담'],
    date: [new Date(), tomorrow],
  };

export default (state = initialState, action) => {
    switch (action.type) {
      case "SET_LOCATION":
        return {
            ...state, 
            location: action.location
            };
      case "SET_DATE":
        return {
          ...state,
          date: action.date
        };
      default:
        return state;
    }
  };