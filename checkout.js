document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkoutForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validate at least one payment method is selected
        const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
        let selected = false;

        paymentMethods.forEach(function(method) {
            if (method.checked) {
                selected = true;
            }
        });

        if (!selected) {
            alert('Please select at least one payment method.');
            return;
        }

        // Simulate payment processing
        alert('Payment successful! Redirecting...');
        window.location.href = 'success.html'; // Replace with actual success page
    });
});
