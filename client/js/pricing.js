// client/js/pricing.js

document.addEventListener("DOMContentLoaded", function () {
  function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
  }

  const products = [
    { id: 'webDesignAddBtn1', name: 'Basic Website', price: 5000, description: 'Includes basic features and a simple design.' },
    { id: 'webDesignAddBtn2', name: 'E-commerce Website', price: 10000, description: 'Includes e-commerce features and a custom design.' },
    { id: 'webDesignAddBtn3', name: 'Custom Website', price: 15000, description: 'Includes custom features tailored to your needs.' },
    { id: 'seoAddBtn1', name: 'Basic SEO Package', price: 2000, description: 'Basic SEO optimization for small websites.' },
    { id: 'seoAddBtn2', name: 'Advanced SEO Package', price: 5000, description: 'Advanced SEO optimization for growing businesses.' },
    { id: 'seoAddBtn3', name: 'Premium SEO Package', price: 8000, description: 'Comprehensive SEO optimization for large websites.' },
    { id: 'sharedHostingAddBtn', name: 'Shared Hosting', price: 100, description: 'Affordable shared hosting for small websites.' },
    { id: 'vpsHostingAddBtn', name: 'VPS Hosting', price: 500, description: 'Virtual Private Server hosting for growing websites.' },
    { id: 'dedicatedHostingAddBtn', name: 'Dedicated Hosting', price: 1500, description: 'Dedicated server hosting for high-traffic websites.' },
    { id: 'domainRegistrationAddBtn1', name: '.co.za Domain', price: 100, description: 'Registration for .co.za domain.' },
    { id: 'domainRegistrationAddBtn2', name: '.com Domain', price: 150, description: 'Registration for .com domain.' },
    { id: 'domainRegistrationAddBtn3', name: 'Other Domains', price: 200, description: 'Registration for other domain extensions.' },
    { id: 'companyRegistrationAddBtn1', name: 'Basic Company Registration', price: 1000, description: 'Basic company registration services.' },
    { id: 'companyRegistrationAddBtn2', name: 'Company Registration with VAT', price: 2000, description: 'Company registration including VAT registration.' },
    { id: 'companyRegistrationAddBtn3', name: 'Company Registration with Trademark', price: 3000, description: 'Company registration including trademark registration.' },
    { id: 'graphicDesignAddBtn1', name: 'Logo Design', price: 2000, description: 'Professional logo design services.' },
    { id: 'graphicDesignAddBtn2', name: 'Business Card Design', price: 500, description: 'Custom business card design.' },
    { id: 'graphicDesignAddBtn3', name: 'Brochure Design', price: 1500, description: 'Professional brochure design services.' },
    { id: 'onlineMarketingAddBtn1', name: 'Social Media Management', price: 3000, description: 'Social media management services.' },
    { id: 'onlineMarketingAddBtn2', name: 'Email Marketing Campaign', price: 2000, description: 'Email marketing campaign management.' },
    { id: 'onlineMarketingAddBtn3', name: 'Pay-Per-Click Advertising', price: 5000, description: 'Pay-per-click advertising campaign management.' }
  ];

  products.forEach(product => {
    const addButton = document.getElementById(product.id);
    if (addButton) {
      addButton.addEventListener('click', function () {
        addToCart(product.name, product.price);
      });
    }
  });

  // Handle adding items to cart from other dynamic buttons
  const pricingButtons = document.querySelectorAll('.pricing-button');
  pricingButtons.forEach(button => {
    button.addEventListener('click', function () {
      const itemName = this.dataset.itemName;
      const itemPrice = parseFloat(this.dataset.itemPrice); // Assuming price is stored as data attribute
      addToCart(itemName, itemPrice);
      alert(`${itemName} added to cart!`);
    });
  });
});
