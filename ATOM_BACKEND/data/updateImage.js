const fs = require('fs');
const path = require('path');

// Assuming your JSON data is in a file named `items.json` in the current directory
const itemsJsonPath = './items.json';
const imagesBasePath = './itemImages/';

const updateItemImages = () => {
  // Read the items JSON file
  fs.readFile(itemsJsonPath, (err, data) => {
    if (err) {
      console.error("Error reading the items JSON file:", err);
      return;
    }

    let items = JSON.parse(data);

    items.forEach(item => {
      const itemImagePath = path.join(imagesBasePath, item.name);
      
      // Check if the directory exists
      if (fs.existsSync(itemImagePath) && fs.statSync(itemImagePath).isDirectory()) {
        const images = fs.readdirSync(itemImagePath)
          .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)) // Filter image files
          .map(file => path.join(itemImagePath, file));

        // Update the 'images' field with an array of image paths
        item.images = images; // Update to use web-accessible paths as needed
      }
    });

    // Write the updated items back to the JSON file or elsewhere
    fs.writeFile(itemsJsonPath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        console.error("Error writing the updated items JSON file:", err);
      } else {
        console.log("Items JSON file has been updated with image paths.");
      }
    });
  });
};

updateItemImages();