document.addEventListener("DOMContentLoaded", () => {
  const productDetail = document.getElementById('productDetail');
  
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(product => {
      if (product) {
        const productDiv = document.createElement('div');
        
      
        productDiv.innerHTML = `<h2>${product.title ?? 'Product Name Unavailable'}</h2>`;

     
        if (product.images && Array.isArray(product.images)) {
          product.images.forEach(image => {
            productDiv.innerHTML += `<img src="${image}" alt="${product.name ?? 'Product Image'}">`;
          });
        }

        productDiv.innerHTML += `
          <p>Description: ${product.description}</p>
          <p>Price: $${product.price}</p>
          <!-- Other detailed information here -->
        `;
        
        productDetail.appendChild(productDiv);
      } else {
        console.error('Product data not found');
        productDetail.innerHTML = '<p>Product details not available.</p>';
      }
    })
    .catch(error => {
      console.error('There was a problem fetching the product data:', error);
      productDetail.innerHTML = '<p>Failed to fetch product details. Please try again later.</p>';
    });
});
