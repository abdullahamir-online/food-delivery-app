// Shopping Cart Functionality

// Initialize Cart Array
let cart = [];

// Function to Add Item to Cart
function addToCart(itemName, itemPrice) {
    // Check if Item Already Exists in Cart
    const existingItem = cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity++;
        alert(`${itemName} quantity increased to ${existingItem.quantity}`);
    } else {
        const newItem = { name: itemName, price: itemPrice, quantity: 1 };
        cart.push(newItem);
        alert(`${itemName} added to cart!`);
    }
    updateCartUI();
}

// Function to Remove Item from Cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    alert(`${itemName} removed from cart!`);
    updateCartUI();
}

// Function to Update Cart UI
function updateCartUI() {
    const cartContainer = document.getElementById('cart-container');
    const totalContainer = document.getElementById('cart-total');
    cartContainer.innerHTML = ''; // Clear Cart UI

    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <span>Qty: ${item.quantity}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalContainer.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let receipt = 'Thank you for your order!\n\n';
    let total = 0;

    cart.forEach(item => {
        receipt += `${item.name} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}\n`;
        total += item.price * item.quantity;
    });

    receipt += `\nTotal: $${total.toFixed(2)}`;
    alert(receipt);

    // Clear Cart After Checkout
    cart = [];
    updateCartUI();
}
