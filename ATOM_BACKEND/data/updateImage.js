const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Read the JSON file
const productsFilePath = path.join(__dirname, 'items.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// Function to post a product
const postProduct = async (product) => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/admin/createItem', product, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(`Successfully posted product: ${product.name}`);
    console.log(response.data);
  } catch (error) {
    console.error(`Error posting product: ${product.name}`);
    console.error(error.response ? error.response.data : error.message);
  }
};

// Loop through each product and post it
const postAllProducts = async () => {
  for (const product of products) {
    await postProduct(product);
  }
};

// Execute the function to post all products
postAllProducts();
