// redux/actions/quoteActions.js

// Example quoteActions.js
// Define actions related to quotes

export const fetchQuotes = () => ({
    type: 'FETCH_QUOTES'
  });
  
  export const createQuote = (quoteData) => ({
    type: 'CREATE_QUOTE',
    payload: quoteData
  });
  