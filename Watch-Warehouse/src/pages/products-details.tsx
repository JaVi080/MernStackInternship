import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import "./products-details.css";

const ProductDetails = () => {
    // 1. Hook to extract the product ID from the URL (e.g., /products/3)
    const { id } = useParams();
    
    // 2. Find the specific product data that matches the extracted ID
    const product = products.find((product) => product.id === Number(id));

    // 3. Conditional rendering: If no product is found, show an error message.
    if (!product) {
        return (
            <div className="container mt-5 text-center">
                <h2>Product not found</h2>
                <Link to="/products" className="btn btn-primary mt-3">Back to Products</Link>
            </div>
        );
    }

    // 4. Render the Product Details layout
    return (
        // *product-details-wrapper*: A custom CSS class that centers everything vertically and adds a background color.
        <div className="product-details-wrapper">
            
            {/* *container*: Bootstrap class that limits the width of the content and centers it horizontally on large screens. */}
            <div className="container">
                
                {/* *custom-product-card*: Custom CSS class that provides the white box, rounded corners, and a dropshadow on hover. */}
                <div className="custom-product-card">
                    
                    {/* *row g-0*: Bootstrap grid system 'row'. 'g-0' removes the default gaps (gutters) between columns. */}
                    <div className="row g-0">
                        
                        {/* LEFT COLUMN: Holds the image. 
                            *col-md-6*: takes half the width on medium to large screens. 
                            *d-flex align-items-center justify-content-center*: flexbox classes to center the image. */}
                        <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
                            {/* *product-image*: Custom CSS class ensuring the image scales nicely using 'object-fit'. 
                                *img-fluid*: Bootstrap class that makes the image responsive (max-width: 100%). */}
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="product-image img-fluid rounded" 
                            />
                        </div>
                        
                        {/* RIGHT COLUMN: Holds the product information.
                            *col-md-6*: takes the other half of the width.
                            *p-5*: Adds large padding (5 is a scale sizing in Bootstrap).
                            *d-flex flex-column justify-content-center*: stacks the text vertically and centers it. */}
                        <div className="col-md-6 p-5 d-flex flex-column justify-content-center bg-white">
                            
                            {/* *product-title*: Custom CSS class allowing us to set specific fonts and text colors. 
                                *mb-3*: Bootstrap Margin-Bottom class for spacing underneath text. */}
                            <h1 className="product-title mb-3">{product.name}</h1>
                            
                            {/* *product-meta*: Custom CSS Grid class that aligns the badges in a tidy structure. */}
                            <div className="product-meta">
                                {/* *badge bg-secondary/info*: Bootstrap rounded pill-like tags with generic colors. */}
                                <span className="badge bg-secondary py-2 fs-6">{product.category}</span>
                                <span className="badge bg-info text-dark py-2 fs-6">{product.gender}</span>
                                {/* *text-warning*: Bootstrap class to turn the text yellow. */}
                                <span className="text-warning fw-bold fs-5 d-flex align-items-center justify-content-end">
                                    ★ {product.rating} / 5
                                </span>
                            </div>
                            
                            {/* *text-muted fs-5*: Bootstrap typography classes making the text grayish and slightly larger. */}
                            <p className="text-muted fs-5 mb-4" style={{ lineHeight: '1.6' }}>
                                {product.description || "Crafted with precision and elegance, this timepiece is perfect for any occasion."}
                            </p>

                            {/* *product-price*: Custom CSS class applying the main brand color and specific size to the price. */}
                            <h2 className="product-price mb-4">
                                ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                            </h2>

                            {/* ACTION BUTTONS */}
                            <div className="d-grid gap-3 d-md-flex mt-auto">
                                {/* *btn btn-primary btn-lg*: Bootstrap primary blue button, made large. */}
                                <button className="btn btn-primary btn-lg px-5 shadow-sm">
                                    Add to Cart
                                </button>
                                {/* *btn btn-outline-secondary*: Bootstrap secondary button that only has an outline until hovered over. */}
                                <Link to="/products" className="btn btn-outline-secondary btn-lg px-5">
                                    Back to Products
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;