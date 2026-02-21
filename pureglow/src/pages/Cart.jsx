
import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

// Props: cartItems - array of items in cart

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
//   CAL Unique itmes
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  
  const tax = totalPrice * 0.1;

  const shipping = totalPrice > 50 ? 0 : 10;

  const grandTotal = totalPrice + tax + shipping;

  return (
    <div className="cart-page">
      <div className="container-custom">
        {/* Page Header */}
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-container">
          {/* Left: Cart Items List */}
          <div className="cart-items-section">
            {cartItems.length === 0 ? (
              // Empty Cart Message
              <div className="empty-cart">
                <div className="empty-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Start shopping to add items to your cart!</p>
                <Link to="/products" className="btn-primary">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              // Display Cart Items
              <>
                <div className="cart-header">
                  <span>Product</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Total</span>
                  <span>Action</span>
                </div>

              
                <div className="cart-items-list">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                
                      <div className="item-name-section">
                        <span className="item-emoji">{item.emoji}</span>
                        <span className="item-name">{item.name}</span>
                      </div>

                      <div className="item-price">
                        ${item.price.toFixed(2)}
                      </div>

                      <div className="item-quantity">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="qty-btn"
                        >
                          −
                        </button>
                        <input 
                          type="number" 
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="qty-input"
                        />
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>

                      <div className="item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <Link to="/products" className="continue-shopping">
                  ← Continue Shopping
                </Link>
              </>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="cart-summary-section">
              <div className="order-summary">
                <h2>Order Summary</h2>

                {/* Summary Items */}
                <div className="summary-row">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="free-shipping">FREE 🎉</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

         
                <div className="summary-total">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>

                <button className="checkout-btn">
                  Proceed to Checkout
                </button>

          
                <div className="summary-info">
                  {shipping > 0 && (
                    <p>📦 Free shipping on orders over $50</p>
                  )}
                  <p>✓ Secure checkout</p>
                  <p>✓ 30-day money back guarantee</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
