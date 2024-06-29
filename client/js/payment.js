document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const payButton = document.getElementById('payButton');
    const paymentForm = document.getElementById('paymentForm');
    const bankTransferOption = document.getElementById('bankTransferOption');
    const bankDetails = document.getElementById('bankDetails');

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
                            <p class="card-text">${item.price}</p>
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

    // Load cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCartItems(cart);

    // Handle payment form submission via PayFast
    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        if (name && email && address && paymentMethod) {
            const formData = {
                name: name,
                email: email,
                address: address,
                paymentMethod: paymentMethod
            };

            fetch('/payfast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.text())
            .then(html => {
                document.open();
                document.write(html);
                document.close();
            })
            .catch(error => console.error('Error:', error));

            // Example of how to use formData to send email using emailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert("Thank you for your payment! You will receive an email shortly.");
                    window.location.href = "thankyou.html"; // Redirect to thank you page
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Oops! Something went wrong with email sending. Please check your email configuration.');
                });

        } else {
            alert('Please fill out all the fields.');
        }
    });

    // Toggle bank details visibility
    bankTransferOption.addEventListener('change', function () {
        if (this.checked) {
            bankDetails.classList.remove('d-none');
        } else {
            bankDetails.classList.add('d-none');
        }
    });

    // Handle payButton click event separately if needed
    payButton.addEventListener('click', function () {
        // Perform form validation or any specific action
    });
});
