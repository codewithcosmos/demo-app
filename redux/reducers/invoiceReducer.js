// redux/reducers/invoiceReducer.js

// Example invoiceReducer.js
// Define reducer for invoice state

const initialState = {
    invoices: []
  };
  
  const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_INVOICES':
        // Logic to fetch invoices from backend and update state
        return state;
      case 'CREATE_INVOICE':
        // Logic to create a new invoice and update state
        return {
          ...state,
          invoices: [...state.invoices, action.payload]
        };
      default:
        return state;
    }
  };
  
  export default invoiceReducer;
  