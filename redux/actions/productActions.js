// redux/actions/productActions.js

// Example productActions.js
// Define actions related to products

export const fetchProducts = () => ({
    type: 'FETCH_PRODUCTS'
  });
  
  export const addProduct = (productData) => ({
    type: 'ADD_PRODUCT',
    payload: productData
  });
  