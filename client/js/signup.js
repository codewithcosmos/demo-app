// client/js/signup.js
document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const formData = { name, email, password };
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const emailParams = {
                to_name: formData.name,
                to_email: formData.email,
                message: 'Welcome to Kasiwebsites! We are glad to have you with us.'
            };

            // Send verification email using EmailJS
            emailjs.send('service_6l4tqxt', 'template_2eeo12m', emailParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response.status, response.text);
                })
                .catch(function(error) {
                    console.error('Failed to send email:', error);
                });

            alert('Sign up successful! Please check your email to verify your account.');
            window.location.href = '/client/html/login.html';
        } else {
            const result = await response.json();
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Sign-up failed. Please try again.');
    }
});
