// common.js

document.addEventListener("DOMContentLoaded", function () {
  // Fetch and insert header
  fetch('/client/html/header.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('header').innerHTML = data;
      });

  // Fetch and insert footer
  fetch('/client/html/footer.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('footer').innerHTML = data;
      });

      // Fetch and insert officials header
  fetch('/client/html/officials.html')
  .then(response => response.text())
  .then(data => {
      document.getElementById('officials').innerHTML = data;
  });

  // Fetch and insert header form
  fetch('/client/html/headerForm.html')
  .then(response => response.text())
  .then(data => {
      document.getElementById('headerForm').innerHTML = data;
  });

  // Function to display day/month/year (dd/mm/yyyy)
  function displayDayMonthYearDate() {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Get month (zero-based) and pad with leading zero if necessary
      const year = now.getFullYear(); // Get full year

      const dayMonthYearDate = `${day}/${month}/${year}`;
      document.getElementById('dateDisplay').textContent = dayMonthYearDate;
  }

  // Call the function to display day/month/year date
  displayDayMonthYearDate();
});
