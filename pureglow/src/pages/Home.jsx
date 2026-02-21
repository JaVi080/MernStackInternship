


import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const featuredProducts = [
    { id: 1, name: 'Glow Serum', price: '$29.99', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4SnmfF5eWMB-rL0KWLFcw-eXuCEUAFmOSXQ&s' },
    { id: 2, name: 'Face Cream', price: '$39.99', image: 'https://thehealthhealer.com.pk/cdn/shop/files/the-health-healer-Night-Cream_Face_wash.jpg?v=1730510368' },
    { id: 3, name: 'Lip Balm', price: '$15.99', image: 'https://letshyphen.com/cdn/shop/files/Card1_f4216b9d-5abe-45ad-9fd7-bb44d5f37af7.jpg?v=1757325443&width=533' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section - Kept custom class for that specific gradient */}
      <section className="hero-section d-flex align-items-center justify-content-center text-center">
        <div className="hero-content container">
          <h1 className="display-3 fw-bold mb-3">Welcome to PureGlow</h1>
          <p className="lead mb-4">Discover premium beauty products for your skincare routine</p>
          <Link to="/products" className="btn btn-light btn-lg fw-bold px-5 py-3 shadow">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-5 mt-4">Featured Products</h2>
        <div className="row g-4">
          {featuredProducts.map(product => (
            <div key={product.id} className="col-12 col-md-6 col-lg-4">
              <Link to={`/product/${product.id}`} className="card h-100 border-0 shadow-sm featured-card text-decoration-none text-dark">
                <div className="card-img-container">
                   <img src={product.image} alt={product.name} className="card-img-top p-3 rounded-5" style={{height: '250px', objectFit: 'cover'}} />
                </div>
                <div className="card-body text-center">
                  <h3 className="h5 fw-bold">{product.name}</h3>
                  <p className="text-primary fw-bold fs-4">{product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-light py-5">
        <div className="container py-4">
          <div className="row text-center g-5">
            <div className="col-md-4">
              <div className="fs-1 mb-3">📦</div>
              <h3 className="h5 fw-bold">Fast Shipping</h3>
              <p className="text-muted">Delivery within 3-5 business days</p>
            </div>
            <div className="col-md-4">
              <div className="fs-1 mb-3">✅</div>
              <h3 className="h5 fw-bold">Quality Guaranteed</h3>
              <p className="text-muted">All products are authentic and tested</p>
            </div>
            <div className="col-md-4">
              <div className="fs-1 mb-3">📞</div>
              <h3 className="h5 fw-bold">24/7 Support</h3>
              <p className="text-muted">We're here to help you anytime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;