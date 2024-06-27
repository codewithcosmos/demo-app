document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const customerName = params.get('name');
    const customerEmail = params.get('email');

    if (customerName && customerEmail) {
        document.getElementById('customerName').textContent = customerName;
        document.getElementById('customerEmail').textContent = customerEmail;

        sendThankYouEmail(customerName, customerEmail);
    } else {
        alert("Missing customer information.");
    }
});

function sendThankYouEmail(name, email) {
    emailjs.init("p3V3MYtW0RRdbvMDq"); // Replace with your userID from EmailJS

    emailjs.send("service_6l4tqxt", "template_2eeo12m", {
        to_name: name,
        to_email: email,
        message: `
            Hi ${name},

            Thank you for your recent purchase with us. We truly appreciate your business and your trust in us.

            If you have any questions or need further assistance, please do not hesitate to contact us.

            Best regards,
            Kasiwebsites team
        `
    }).then(
        function(response) {
            alert("Thank you, email sent successfully!");
        },
        function(error) {
            alert("Failed to send thank you email: " + error);
        }
    );
}
