document.addEventListener('DOMContentLoaded', function () {
    const cartTableBody = document.querySelector('#cartTable tbody');

    // Function to update cart in localStorage
    function updateCart(itemName, itemPrice, action) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (action === 'add') {
            cart.push({ name: itemName, price: itemPrice });
        } else if (action === 'remove') {
            cart = cart.filter(item => item.name !== itemName);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(); // Update the displayed cart
    }

    // Function to render cart items in the table
    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartTableBody.innerHTML = ''; // Clear existing table rows
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>R${item.price}</td>
                <td><button class="btn btn-danger remove-item-btn" data-item="${item.name}">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                updateCart(this.getAttribute('data-item'), null, 'remove');
            });
        });
    }

    // Add event listeners to 'Add to Cart' buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function () {
            const itemName = this.getAttribute('data-item');
            const itemPrice = parseFloat(this.getAttribute('data-price'));
            updateCart(itemName, itemPrice, 'add');
        });
    });

    // Event listener for 'Proceed to Payment' button
    const proceedToPaymentBtn = document.getElementById('proceedToPaymentBtn');
    if (proceedToPaymentBtn) {
        proceedToPaymentBtn.addEventListener('click', function () {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length > 0) {
                alert('Proceeding to payment...');
                // Implement your payment logic here
            } else {
                alert('Your cart is empty.');
            }
        });
    }

    // Initial rendering of the cart
    renderCart();
});
