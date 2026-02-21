
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

// get the dynamic parts of the URL--. useParams

// Props: addToCart
function ProductDetail({ addToCart }) {
  // getting ids
  const { id } = useParams();
  const navigate = useNavigate();

 //dummy data here
   
  const allProducts = [
    { id: 1, name: 'Glow Serum', price: 29.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4SnmfF5eWMB-rL0KWLFcw-eXuCEUAFmOSXQ&s', description: 'Achieve a radiant glow with our premium glow serum. Contains vitamin C and hyaluronic acid for maximum hydration and brightening.', longDesc: 'Our best-selling glow serum is formulated with natural ingredients to give your skin a healthy, radiant appearance. Use morning and night for best results.' },
     { id: 2, name: 'Face Cream', price: 39.99, image: 'https://thehealthhealer.com.pk/cdn/shop/files/the-health-healer-Night-Cream_Face_wash.jpg?v=1730510368', description: 'Luxurious moisturizing cream for all skin types. Enriched with natural oils and extracts to nourish and protect your skin.', longDesc: 'Perfect for daily use, this moisturizing cream hydrates and protects your skin. Suitable for all skin types including sensitive skin.' },
    { id: 3, name: 'Lip Balm', price: 15.99, image: 'https://letshyphen.com/cdn/shop/files/Card1_f4216b9d-5abe-45ad-9fd7-bb44d5f37af7.jpg?v=1757325443&width=533', description: 'Keep your lips soft and smooth with our moisturizing lip balm. SPF 30 protection included.', longDesc: 'Prevent dry, chapped lips with our nourishing lip balm. Contains natural beeswax and shea butter for ultimate softness.' },
    { id: 4, name: 'Face Wash', price: 19.99, image: 'https://conaturalintl.com/cdn/shop/files/rose_face_wash.jpg?v=1770034815', description: 'Gentle yet effective face wash for daily cleansing. Removes makeup and impurities without drying skin.', longDesc: 'Our gentle face wash cleanses without harsh chemicals. Perfect for morning and night use on all skin types.' },
   { id: 5, name: 'Moisturizer', price: 34.99, image: 'https://kleanbeauty.co/cdn/shop/files/klean_products_5_00e2bebf-8f7b-477b-901e-d49979515589.jpg?v=1768384306', description: 'Lightweight moisturizer that absorbs quickly. Hydrates without leaving greasy residue.', longDesc: 'Keep your skin hydrated all day with our lightweight moisturizer formula. Perfect for combination and oily skin types.' },
    { id: 6, name: 'Sunscreen', price: 24.99, image: 'https://i0.wp.com/whizlaboratories.com/wp-content/uploads/2024/09/Beauwell-Sunscreen-Lotion-Spray-2.webp?fit=1500%2C1500&ssl=1', description: 'Broad spectrum SPF 50 protection. Water-resistant and reef-safe formula.', longDesc: 'Protect your skin from harmful UV rays with our SPF 50 sunscreen. Water-resistant formula perfect for outdoor activities.' },
    { id: 7, name: 'Eye Cream', price: 44.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTnKnQyj6CP8CtuLMWRXADMKBn_DbXo0Fyhw&s', description: 'Target fine lines and dark circles with our specialized eye cream. Caffeine and retinol formula.', longDesc: 'Our eye cream targets signs of aging around delicate eye area. Use morning and night for best results.' }
  ];

//pro based on ids
  const product = allProducts.find(p => p.id === parseInt(id));

  // State for quantity selector
  const [quantity, setQuantity] = useState(1);

  
  const handleAddToCart = () => {
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  // If product not found ten err
  if (!product) {
    return (
      <div className="product-detail-page container-custom">
        <div className="not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container-custom">
        {/* Back Button */}
        <button onClick={() => navigate('/products')} className="back-btn">
          ← Back to Products
        </button>

   
        <div className="product-detail-container">
      
          <div className="detail-image-section">
            <div className="detail-image">
  <img 
    src={product.image} 
    alt={product.name} 
    className="detail-img"
  />
</div>
          </div>
{/* pro info */}
          <div className="detail-info-section">
            <h1 className="detail-title">{product.name}</h1>
            
            <div className="detail-rating">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span className="review-count">(120 customer reviews)</span>
            </div>

            <div className="detail-price">
              <span className="price-label">Price:</span>
              <span className="price-value">${product.price.toFixed(2)}</span>
            </div>

            <div className="detail-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

       
            <div className="detail-long-description">
              <h3>Details</h3>
              <p>{product.longDesc}</p>
            </div>

            {/* Quantity Selector and Add to Cart */}
            <div className="detail-actions">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  {/* Decrease quantity button */}
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="qty-btn"
                  >
                    −
                  </button>
                  {/* Display current quantity */}
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="qty-input"
                  />
    
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

            {/* add to cart here -- */}
              <button 
                onClick={handleAddToCart}
                className="btn-primary add-to-cart-btn"
              >
                🛒 Add to Cart
              </button>
            </div>

            {/* Additional Info beloww*/}
            <div className="detail-info-box">
              <div className="info-item">
                <span>✓ Free Shipping</span>
              </div>
              <div className="info-item">
                <span>✓ 30-Day Money Back</span>
              </div>
              <div className="info-item">
                <span>✓ Cruelty Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
