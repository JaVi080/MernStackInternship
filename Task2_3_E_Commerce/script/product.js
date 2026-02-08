// Image gallary handler
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            
            this.classList.add('active');
            
            console.log('Thumbnail clicked:', index);
        });
    });
});

// Quanityy controlls
document.addEventListener('DOMContentLoaded', function() {
    const qtyInput = document.querySelector('.qty-input');
    
    const increaseBtn = document.getElementById('increase');
    if (increaseBtn) {
        increaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(qtyInput.value);
            let maxValue = parseInt(qtyInput.getAttribute('max')) || 10;
            
            if (currentValue < maxValue) {
                qtyInput.value = currentValue + 1;
            }
        });
    }
    
    const decreaseBtn = document.getElementById('decrease');
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            let currentValue = parseInt(qtyInput.value);
            let minValue = parseInt(qtyInput.getAttribute('min')) || 1;
            
            if (currentValue > minValue) {
                qtyInput.value = currentValue - 1;
            }
        });
    }
});

// Sizee selector
document.addEventListener('DOMContentLoaded', function() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            
            this.classList.add('active');
            
            console.log('Selected size:', this.textContent);
        });
    });
});

// Add too cart button
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = '✓ Added to Cart!';
            this.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
            
            updateCartBadge();
        });
    }
});

// Filterr buttons handler
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            this.classList.add('active');
            
            console.log('Filter selected:', this.textContent);
            
            const categoryName = this.textContent;
            console.log('Filtering products by:', categoryName);
        });
    });
});

// Wishlistt button handler
document.addEventListener('DOMContentLoaded', function() {
    const wishlistBtn = document.querySelector('.wishlist-btn');
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const isInWishlist = this.classList.contains('in-wishlist');
            
            if (isInWishlist) {
                this.textContent = '♡ Wishlist';
                this.classList.remove('in-wishlist');
            } else {
                this.textContent = '♥ In Wishlist';
                this.classList.add('in-wishlist');
                this.style.backgroundColor = '#e74c3c';
                this.style.borderColor = '#e74c3c';
                this.style.color = 'white';
            }
            
            console.log('Wishlist toggled');
        });
    }
});
