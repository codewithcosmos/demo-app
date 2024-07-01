// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            // Redirect to home page
            window.location.href = '/';
        } else {
            const result = await response.json();
            alert(result.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Toggle password visibility
var togglePassword = document.getElementById('togglePassword');
var passwordField = document.getElementById('password');

togglePassword.addEventListener('click', function() {
    var type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
});

// Handle forgot password form submission
document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var formData = {
        email: document.getElementById('forgotEmail').value
    };

    fetch('/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            // Close the modal after submission (Bootstrap 4)
            $('#forgotPasswordModal').modal('hide');
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});

// Handle signup form submission
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

            emailjs.send('service_6l4tqxt', 'template_2eeo12m', emailParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response.status, response.text);
                })
                .catch(function(error) {
                    console.error('Failed to send email:', error);
                });

            alert('Sign up successful! Please check your email to verify your account.');
            window.location.href = '/login.html';
        } else {
            const result = await response.json();
            alert(result.message); // Display server-side error message if signup fails
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Sign-up failed. Please try again.'); // Display generic error message if fetch fails
    }
});
