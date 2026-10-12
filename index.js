import { products } from './products.js';

// 1. map: Get an array of formatted product labels
const productLabels = products.map((item) => `${item.name} ($${item.price})`);
console.log('--- Product Labels (map) ---');
console.log(productLabels);

// 2. filter: Find all items that are in stock
const availableProducts = products.filter((item) => item.inStock);
console.log('\n--- In Stock Products (filter) ---');
console.log(availableProducts);

// 3. find: Get the item with ID 3
const targetItem = products.find((item) => item.id === 3);
console.log('\n--- Item ID 3 (find) ---');
console.log(targetItem);

// 4. reduce: Calculate total value of all in-stock products
const totalInventoryValue = products.reduce((acc, item) => {
  return item.inStock ? acc + item.price : acc;
}, 0);
console.log('\n--- Total Value of Stock (reduce) ---');
console.log(`$${totalInventoryValue}`);

// 5. sort: Sort products by price ascending (non-destructive using spread)
const sortedByPrice = [...products].sort((a, b) => a.price - b.price);
console.log('\n--- Sorted by Price (sort) ---');
console.log(sortedByPrice);