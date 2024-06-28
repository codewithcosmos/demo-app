document.addEventListener("DOMContentLoaded", function () {
    fetch('/client/html/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header').innerHTML = data;
      });
  
    fetch('/client/html/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer').innerHTML = data;
      });
  });
  
  $(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#backToTopBtn').fadeIn();
        } else {
            $('#backToTopBtn').fadeOut();
        }
    });

    $('#backToTopBtn').click(function() {
        $('html, body').animate({scrollTop : 0}, 800);
        return false;
    });
});
  