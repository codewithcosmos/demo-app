document.addEventListener('DOMContentLoaded', function () {
    const cartTableBody = document.querySelector('#cartTable tbody');
  
    function updateCart(itemName, itemPrice, action) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (action === 'add') {
        cart.push({ name: itemName, price: itemPrice });
      } else if (action === 'remove') {
        cart = cart.filter(item => item.name !== itemName);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  
    function renderCart() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cartTableBody.innerHTML = '';
      cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td><button class="btn btn-danger remove-item-btn" data-item="${item.name}">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
      });
      document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          updateCart(this.getAttribute('data-item'), null, 'remove');
        });
      });
    }
  
    document.getElementById('proceedToPaymentBtn').addEventListener('click', function () {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length > 0) {
        alert('Proceeding to payment...');
        // Store cart details in localStorage or sessionStorage for the payment page
        localStorage.setItem('cart', JSON.stringify(cart));
        // Navigate to the payment page
        window.location.href = 'payment.html';
      } else {
        alert('Your cart is empty.');
      }
    });
  
    renderCart();
  });
  