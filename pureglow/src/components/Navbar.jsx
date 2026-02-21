
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Navbar comp- displayed on all pages with navigation links
// Props: cartCount - number of items in cart
function Navbar({ cartCount }) {
  return (
    <nav className="navbar-custom">
      <div className="navbar-container">
    
        <Link to="/" className="navbar-brand">
          🛍️ PureGlow
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/products" className="nav-link">Products</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
          <li><Link to="/admin" className="nav-link">Admin</Link></li>
        </ul>

        {/* Cart Icon with count */}
        <Link to="/cart" className="cart-icon">
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
