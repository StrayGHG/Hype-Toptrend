// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render cart items
function renderCart() {
    const cartItems = document.querySelector('.cart-items');
    const subtotalEl = document.querySelector('.subtotal');
    const totalEl = document.querySelector('.total-amount');
    const shippingEl = document.querySelector('.shipping');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        subtotalEl.textContent = '$0.00';
        shippingEl.textContent = '$0.00';
        totalEl.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <div class="item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                </div>
            </div>
            <button class="remove-item">×</button>
        </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    shippingEl.textContent = `$${shipping.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;

    updateCartCount();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

// Remove item
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Update cart count in nav
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Event listeners
document.querySelector('.cart-items').addEventListener('click', (e) => {
    const cartItem = e.target.closest('.cart-item');
    if (!cartItem) return;

    const productId = parseInt(cartItem.dataset.id);

    if (e.target.classList.contains('plus')) {
        updateQuantity(productId, 1);
    }
    if (e.target.classList.contains('minus')) {
        updateQuantity(productId, -1);
    }
    if (e.target.classList.contains('remove-item')) {
        removeItem(productId);
    }
});

document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout...');
    // Add checkout logic here
});

// Initial render
renderCart(); 