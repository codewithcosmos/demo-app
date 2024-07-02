// redux/reducers/productReducer.js

// Example productReducer.js
// Define reducer for product state

const initialState = {
    products: []
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS':
        // Logic to fetch products from backend and update state
        return state;
      case 'ADD_PRODUCT':
        // Logic to add a new product to the state
        return {
          ...state,
          products: [...state.products, action.payload]
        };
      default:
        return state;
    }
  };
  
  export default productReducer;
  