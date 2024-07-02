// redux/store.js

// Example store.js
// Configure Redux store with combined reducers

import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import productReducer from './reducers/productReducer';
import quoteReducer from './reducers/quoteReducer';
import invoiceReducer from './reducers/invoiceReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  quotes: quoteReducer,
  invoices: invoiceReducer
});

const store = createStore(rootReducer);

export default store;
