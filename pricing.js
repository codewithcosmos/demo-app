document.addEventListener("DOMContentLoaded", function () {
    function addToCart(productName, price) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ name: productName, price: price });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${productName} has been added to your cart!`);
    }
  
    const products = [
      { id: 'webDesignAddBtn1', name: 'Basic Website', price: 5000 },
      { id: 'webDesignAddBtn2', name: 'E-commerce Website', price: 10000 },
      { id: 'webDesignAddBtn3', name: 'Custom Website', price: 15000 },
      { id: 'seoServicesAddBtn1', name: 'Basic SEO', price: 2000 },
      { id: 'seoServicesAddBtn2', name: 'Advanced SEO', price: 5000 },
      { id: 'hostingAddBtn1', name: 'Basic Hosting', price: 1000 },
      { id: 'hostingAddBtn2', name: 'Advanced Hosting', price: 3000 },
      { id: 'domainRegistrationAddBtn1', name: '.com Domain', price: 150 },
      { id: 'domainRegistrationAddBtn2', name: '.co.za Domain', price: 100 },
      { id: 'companyRegistrationAddBtn1', name: 'Basic Company Registration', price: 500 },
      { id: 'companyRegistrationAddBtn2', name: 'Advanced Company Registration', price: 1000 }
    ];
  
    products.forEach(product => {
      const addButton = document.getElementById(product.id);
      if (addButton) {
        addButton.addEventListener('click', function () {
          addToCart(product.name, product.price);
        });
      }
    });
  });
  