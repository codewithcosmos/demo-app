const emailjs = require('emailjs-com');

// Function to send email using EmailJS
exports.sendEmail = (templateParams) => {
  return new Promise((resolve, reject) => {
    emailjs.send('EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', templateParams)
      .then(function(response) {
        console.log('Email sent:', response);
        resolve(response);
      }, function(error) {
        console.error('Email failed:', error);
        reject(error);
      });
  });
};
