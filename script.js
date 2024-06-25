// script.js
document.addEventListener("DOMContentLoaded", function() {
  // Load header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading header:', error);
    });

  // Load footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;

      // Set current year in the footer
      const yearSpan = document.getElementById('year');
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }

      // Scroll to top functionality
      const scrollToTopButton = document.getElementById('scrollToTop');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          scrollToTopButton.style.display = 'block';
        } else {
          scrollToTopButton.style.display = 'none';
        }
      });

      scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });

    })
    .catch(error => {
      console.error('Error loading footer:', error);
    });
});
