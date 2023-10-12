// products.js

// Function to fetch and display products from the server
async function fetchAndDisplayProducts() {
    try {
        const response = await fetch('/api/products'); // Replace with your API endpoint
        const products = await response.json();

        // Code to update the HTML table with the products data
        // You can use DOM manipulation or a JavaScript framework like React, Vue, or Angular to update the table.

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to handle form submission for adding new products
async function handleAddProductForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);

    if (!name || isNaN(price)) {
        console.error('Invalid input');
        return;
    }

    const newProduct = { name, price };

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });

        if (response.ok) {
            // Product added successfully, update the HTML table
            fetchAndDisplayProducts();
        } else {
            console.error('Failed to add product');
        }
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Add event listeners to call the above functions when the page loads and the form is submitted
document.addEventListener('DOMContentLoaded', fetchAndDisplayProducts);
document.getElementById('addProductForm').addEventListener('submit', handleAddProductForm);
