document.addEventListener("DOMContentLoaded", function () {
    const paymentForm = document.getElementById('paymentForm');

    paymentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;

        // Simulate payment processing
        setTimeout(() => {
            alert('Payment processed successfully!');
            window.location.href = `success.html?name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}`;
        }, 1000);
    });
});
