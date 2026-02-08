// Functoin to increase quantity in cart
function increaseQty(itemId) {
    const qtyInput = document.getElementById('qty-' + itemId);
    const currentValue = parseInt(qtyInput.value);
    const maxValue = 10;
    
    if (currentValue < maxValue) {
        qtyInput.value = currentValue + 1;
        updateItemTotal(itemId);
        updateCartTotals();
    }
}

// Functoin to decrease quantity in cart
function decreaseQty(itemId) {
    const qtyInput = document.getElementById('qty-' + itemId);
    const currentValue = parseInt(qtyInput.value);
    const minValue = 1;
    
    if (currentValue > minValue) {
        qtyInput.value = currentValue - 1;
        updateItemTotal(itemId);
        updateCartTotals();
    }
}

// Updat item total
function updateItemTotal(itemId) {
    const qtyInput = document.getElementById('qty-' + itemId);
    const quantity = parseInt(qtyInput.value);
    
    const prices = {
        1: 4500,
        2: 3800,
        3: 5200
    };
    
    const price = prices[itemId];
    const total = price * quantity;
    
    const totalElement = document.getElementById('total-' + itemId);
    if (totalElement) {
        totalElement.textContent = 'PKR ' + total.toLocaleString();
    }
}

// Update cart totls
function updateCartTotals() {
    let subtotal = 0;
    
    const qty1 = parseInt(document.getElementById('qty-1')?.value || 0);
    subtotal += qty1 * 4500;
    
    const qty2 = parseInt(document.getElementById('qty-2')?.value || 0);
    subtotal += qty2 * 3800;
    
    const qty3 = parseInt(document.getElementById('qty-3')?.value || 0);
    subtotal += qty3 * 5200;
    
    const taxRate = 0.08;
    const tax = subtotal * taxRate;
    
    const total = subtotal + tax;
    
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = 'PKR ' + subtotal.toLocaleString();
    if (taxElement) taxElement.textContent = 'PKR ' + Math.round(tax).toLocaleString();
    if (totalElement) totalElement.textContent = 'PKR ' + Math.round(total).toLocaleString();
}

// Clearr cart functoin
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        alert('Cart cleared! (This is a demo - no actual cart data is stored)');
        console.log('Cart cleared');
    }
}

// Updatee cart badge
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        let currentCount = parseInt(cartBadge.textContent);
        cartBadge.textContent = currentCount + 1;
        
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartBadge.style.transform = 'scale(1)';
        }, 300);
    }
}

// ceck out 
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Proceeding to checkout...\n\n(Note: This is a demo - no actual checkout process)');
            console.log('Checkout initiated');
        });
    }
});
