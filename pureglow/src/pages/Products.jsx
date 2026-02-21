

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';

function Products({ addToCart }) {
  const allProducts = [
    { id: 1, name: 'Glow Serum', price: 29.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4SnmfF5eWMB-rL0KWLFcw-eXuCEUAFmOSXQ&s', category: 'Serums' },
    { id: 2, name: 'Face Cream', price: 39.99, image: 'https://thehealthhealer.com.pk/cdn/shop/files/the-health-healer-Night-Cream_Face_wash.jpg?v=1730510368', category: 'Creams' },
    { id: 3, name: 'Lip Balm', price: 15.99, image: 'https://letshyphen.com/cdn/shop/files/Card1_f4216b9d-5abe-45ad-9fd7-bb44d5f37af7.jpg?v=1757325443&width=533', category: 'Lips' },
    { id: 4, name: 'Face Wash', price: 19.99, image: 'https://conaturalintl.com/cdn/shop/files/rose_face_wash.jpg?v=1770034815', category: 'Cleaners' },
    { id: 5, name: 'Moisturizer', price: 34.99, image: 'https://kleanbeauty.co/cdn/shop/files/klean_products_5_00e2bebf-8f7b-477b-901e-d49979515589.jpg?v=1768384306', category: 'Moisturizers' },
    { id: 6, name: 'Sunscreen', price: 24.99, image: 'https://i0.wp.com/whizlaboratories.com/wp-content/uploads/2024/09/Beauwell-Sunscreen-Lotion-Spray-2.webp?fit=1500%2C1500&ssl=1', category: 'Protection' },
    { id: 7, name: 'Eye Cream', price: 44.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTnKnQyj6CP8CtuLMWRXADMKBn_DbXo0Fyhw&s', category: 'Eyes' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...new Set(allProducts.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="products-page py-5">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-dark">Our Products</h1>
          <p className="lead text-muted">Choose from our wide range of beauty products</p>
        </div>
{/* category  */}
<div className="bg-white p-4 rounded-3 shadow-sm mb-5">
  <h3 className="h6 fw-bold mb-3">Filter by Category</h3>
  <div className="d-flex flex-wrap gap-2 justify-content-start"> {/* Added justify-content-start */}
    {categories.map(category => (
      <button
        key={category}
        className={`btn px-4 py-2 rounded-pill ${selectedCategory === category ? 'btn-primary' : 'btn-outline-secondary fw-semibold'}`}
        style={{ width: 'auto' }} // Forces buttons to only be as wide as their text
        onClick={() => setSelectedCategory(category)}
      >
        {category}
      </button>
    ))}
  </div>
</div> 

        {/* Products Grid */}
        <div className="row g-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <div className="card h-100 border-0 shadow-sm product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="card-img-top" style={{height: '220px', objectFit: 'cover'}} />
                </div>
                <div className="card-body d-flex flex-column">
                  <span className="text-primary fw-bold small text-uppercase mb-1">{product.category}</span>
                  <h3 className="h6 fw-bold text-dark mb-2">{product.name}</h3>
                  <p className="h4 fw-bold text-danger mb-2">${product.price.toFixed(2)}</p>
                  <p className="text-warning small mb-3">⭐⭐⭐⭐⭐ <span className="text-muted">(120)</span></p>

                  <div className="mt-auto d-grid gap-2">
                    <Link to={`/product/${product.id}`} className="btn btn-outline-primary btn-sm">
                      View Details
                    </Link>
                    <button className="btn btn-primary btn-sm" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-5 text-muted">
            <p className="fs-5">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;