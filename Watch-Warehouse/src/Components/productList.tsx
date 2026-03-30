// ============================================================
// ProductList Component
// ------------------------------------------------------------
// This component renders the full "Featured Products" section.
// It imports the products array from the data file and
// maps over them to render a ProductCard for each product.
// Bootstrap grid (row/col) handles the responsive layout.
// ============================================================

import { products } from "../data/products";
import ProductCard from "./productCard";

type Props ={
limit?: number; // Optional prop to limit the number of products displayed
};
const ProductList = ({ limit }: Props) => {
  const displayedProducts = limit !== undefined ? products.slice(0, limit) : products;
  return (
    // Bootstrap "container" centers the content and adds horizontal padding
    <section className="container py-5">

      {/* ── Section Header ── */}
      <div className="text-center mb-5">
        {/* Small label above the title */}
        <span
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #b8960c, #d4af37)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          Our Collection
        </span>

        {/* Main section title */}
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            color: "#1a1a2e",
            marginBottom: "12px",
          }}
        >
          Featured Timepieces
        </h2>

        {/* Decorative gold underline */}
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "linear-gradient(135deg, #b8960c, #d4af37)",
            margin: "0 auto 16px",
            borderRadius: "2px",
          }}
        />

        {/* Subtitle */}
        <p className="text-muted" style={{ maxWidth: "500px", margin: "0 auto", fontSize: "0.95rem" }}>
          Handpicked luxury watches from the world's finest brands — crafted for those who value precision.
        </p>
      </div>

      {/* ── Product Grid ── */}
      {/*
        Bootstrap responsive grid:
          col-12      → 1 card per row on mobile
          col-sm-6    → 2 cards per row on small screens (≥576px)
          col-md-4    → 3 cards per row on medium screens (≥768px)
          col-lg-3    → 4 cards per row on large screens (≥992px)
      */}
      <div className="row g-4">
        {displayedProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            {/* Render one ProductCard per product, passing the product data as a prop */}
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <button
        style={{
           fontFamily: "'Montserrat', sans-serif", letterSpacing: "2px",
                marginTop: "40px",
                padding: "10px 20px",
                backgroundColor: "#0f0f0f",
                color: "#ffc107",
                border: "1px solid #ffc107",
                borderRadius: "5px",
            }}
            onMouseEnter={(e) => {
                (e.currentTarget.style.transform = "scale(1.05)");
                (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
            }}
               onMouseLeave={(e) => {
                (e.currentTarget.style.transform = "scale(1)");
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            }}
        >
        View All Products <i className="bi bi-arrow-right"></i>
      </button>
    </section>
    
  );
};

export default ProductList;
