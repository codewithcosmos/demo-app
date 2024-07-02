// redux/actions/authActions.js

// Example authActions.js
// Define actions related to authentication

export const login = (credentials) => ({
    type: 'LOGIN',
    payload: credentials
  });
  
  export const logout = () => ({
    type: 'LOGOUT'
  });
  