// redux/actions/invoiceActions.js

// Example invoiceActions.js
// Define actions related to invoices

export const fetchInvoices = () => ({
    type: 'FETCH_INVOICES'
  });
  
  export const createInvoice = (invoiceData) => ({
    type: 'CREATE_INVOICE',
    payload: invoiceData
  });
  