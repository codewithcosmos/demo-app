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
        <td>R${item.price}</td>
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

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function () {
      const itemName = this.getAttribute('data-item');
      const itemPrice = parseFloat(this.getAttribute('data-price'));
      updateCart(itemName, itemPrice, 'add');
    });
  });

  document.getElementById('proceedToPaymentBtn').addEventListener('click', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
      alert('Proceeding to payment...');
      // Implement payment logic here
    } else {
      alert('Your cart is empty.');
    }
  });

  renderCart();
});
