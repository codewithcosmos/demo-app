document.addEventListener('DOMContentLoaded', function () {
  const cartItemsContainer = document.getElementById('cart-items');
  const paymentForm = document.getElementById('payment-form');
  const bankTransferOption = document.getElementById('bankTransferOption');
  const bankDetails = document.getElementById('bankDetails');
  const payfastForm = document.querySelector('form[name="PayFastPayNowForm"]');

  // Function to render cart items
  function renderCartItems(items) {
      let html = '';
      if (items.length === 0) {
          html = '<p>Your cart is empty.</p>';
      } else {
          items.forEach(item => {
              html += `
                  <div class="card mb-3">
                      <div class="card-body">
                          <h5 class="card-title">${item.name}</h5>
                          <p class="card-text">R${item.price}</p>
                          <button class="btn btn-danger remove-item-btn" data-item="${item.name}">Remove</button>
                      </div>
                  </div>
              `;
          });
      }
      cartItemsContainer.innerHTML = html;

      // Attach event listeners to remove buttons
      document.querySelectorAll('.remove-item-btn').forEach(btn => {
          btn.addEventListener('click', function () {
              updateCart(this.getAttribute('data-item'), null, 'remove');
          });
      });
  }

  // Function to update the cart in localStorage
  function updateCart(itemName, itemPrice, action) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (action === 'add') {
          cart.push({ name: itemName, price: itemPrice });
      } else if (action === 'remove') {
          cart = cart.filter(item => item.name !== itemName);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems(cart);
  }

  // Function to fetch items from cart
  function getCartItems() {
      return JSON.parse(localStorage.getItem('cart')) || [];
  }

  // Function to calculate total amount from cart items
  function calculateTotalAmount(cart) {
      let total = 0;
      cart.forEach(item => {
          total += parseFloat(item.price);
      });
      return total.toFixed(2); // Assuming prices are stored as strings
  }

  // Load cart items and render them
  const cart = getCartItems();
  renderCartItems(cart);

  // Handle payment form submission via EmailJS
  paymentForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', data)
          .then(function (response) {
              console.log('SUCCESS!', response.status, response.text);
              alert('Form submitted successfully!');
          }, function (error) {
              console.log('FAILED...', error);
              alert('Form submission failed. Please try again.');
          });

      // Redirect to PayFast payment page
      payfastForm.amount.value = calculateTotalAmount(cart); // Set the amount dynamically
      payfastForm.submit();
  });

  // Toggle bank details visibility
  bankTransferOption.addEventListener('change', function () {
      if (this.checked) {
          bankDetails.classList.remove('d-none');
      } else {
          bankDetails.classList.add('d-none');
      }
  });

  // PayPal button rendering
  paypal.Buttons({
      createOrder: function (data, actions) {
          return actions.order.create({
              purchase_units: [{
                  amount: {
                      value: calculateTotalAmount(cart) // Replace with the total amount dynamically
                  }
              }]
          });
      },
      onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
              alert('Transaction completed by ' + details.payer.name.given_name);
              // Additional actions after payment approval (e.g., updating database)
          });
      }
  }).render('#paypal-button-container');
});
