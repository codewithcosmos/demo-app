// seedProducts.js

document.addEventListener("DOMContentLoaded", function() {
    const products = [
      {
        category: "Web Design",
        services: [
          { name: "Basic Website", price: 5000 },
          { name: "E-commerce Website", price: 10000 },
          { name: "Custom Website", price: 15000 }
        ]
      },
      {
        category: "SEO Services",
        services: [
          { name: "Basic SEO Package", price: 2000 },
          { name: "Advanced SEO Package", price: 5000 },
          { name: "Premium SEO Package", price: 8000 }
        ]
      },
      {
        category: "Hosting Services",
        services: [
          { name: "Shared Hosting", price: 100 },
          { name: "VPS Hosting", price: 500 },
          { name: "Dedicated Hosting", price: 1500 }
        ]
      },
      {
        category: "Domain Registration",
        services: [
          { name: ".co.za Domain", price: 100 },
          { name: ".com Domain", price: 250 },
          { name: "Other Domains", price: 200 }
        ]
      },
      {
        category: "Company Registration",
        services: [
          { name: "Basic Company Registration", price: 1000 },
          { name: "Company Registration with VAT", price: 2000 },
          { name: "Company Registration with Trademark", price: 3000 }
        ]
      }
    ];
  
    const productList = document.getElementById("product-list");
  
    products.forEach(product => {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("mt-4");
  
      const categoryTitle = document.createElement("h2");
      categoryTitle.textContent = product.category;
      categoryDiv.appendChild(categoryTitle);
  
      const serviceList = document.createElement("ul");
      serviceList.classList.add("list-group");
  
      product.services.forEach(service => {
        const serviceItem = document.createElement("li");
        serviceItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        serviceItem.textContent = service.name;
  
        const servicePrice = document.createElement("span");
        servicePrice.classList.add("badge", "badge-primary", "badge-pill");
        servicePrice.textContent = `R${service.price}`;
  
        serviceItem.appendChild(servicePrice);
        serviceList.appendChild(serviceItem);
      });
  
      categoryDiv.appendChild(serviceList);
      productList.appendChild(categoryDiv);
    });
  });
  