// redux/reducers/quoteReducer.js

// Example quoteReducer.js
// Define reducer for quote state

const initialState = {
    quotes: []
  };
  
  const quoteReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_QUOTES':
        // Logic to fetch quotes from backend and update state
        return state;
      case 'CREATE_QUOTE':
        // Logic to create a new quote and update state
        return {
          ...state,
          quotes: [...state.quotes, action.payload]
        };
      default:
        return state;
    }
  };
  
  export default quoteReducer;
  