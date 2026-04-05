// ============================================================
// 📦 CONCEPT: Importing Types
// ------------------------------------------------------------
// TypeScript lets us define the "shape" of data using types/interfaces.
// Here we import the Product type from another file so TypeScript knows
// exactly what fields a product object must have (id, name, price, etc.).
// If you pass wrong data, TypeScript will show a red error BEFORE you run
// the code — that's the whole point of TypeScript over plain JavaScript.
// ============================================================
import type { Product } from "../types/product";
import {Link} from "react-router-dom";

// ============================================================
// 📦 CONCEPT: Props (Properties)
// ------------------------------------------------------------
// In React, "props" are how a PARENT component sends data DOWN to a
// CHILD component — just like passing arguments into a function.
//
// Here we define a "Props" type that says:
//   this component expects ONE prop called "product" of type Product.
//
// When the parent (ProductList) writes:
//   <ProductCard product={someProduct} />
// React passes that product object into this component automatically.
// ============================================================
type Props = {
  product: Product;
};


// ============================================================
// ⭐ CONCEPT: Helper Functions in React
// ------------------------------------------------------------
// You can define normal JavaScript functions outside of a component
// and use them inside JSX. This keeps your JSX clean and readable.
//
// This function takes a numeric rating (e.g. 4.5) and returns
// a row of star characters to display visually.
//
// HOW IT WORKS:
//   rating = 4.5
//   fullStars  = Math.floor(4.5) = 4   → "★★★★"
//   emptyStars = 5 - 4 = 1             → "☆"
//   Result: ★★★★☆  and label "4.5 / 5"
//
// Math.floor() → rounds DOWN to nearest whole number
// "★".repeat(n) → repeats the star character n times
// ============================================================
const renderStars = (rating: number) => {
  const fullStars  = Math.floor(rating);       // number of filled stars
  const emptyStars = 5 - fullStars;            // remaining empty stars

  return (
    // CONCEPT: Fragment (<>) — wraps multiple elements without adding an extra <div>
    <>
      {/* CONCEPT: String.repeat() — e.g. "★".repeat(4) gives "★★★★" */}
      <span style={{ color: "#f5a623" }}>{"★".repeat(fullStars)}</span>
      <span style={{ color: "#ccc"    }}>{"☆".repeat(emptyStars)}</span>

      {/*
        CONCEPT: Template Literal (``)
        Backticks let you embed variables inside a string using ${}.
        So `${rating} / 5` becomes "4.5 / 5" — much cleaner than
        string concatenation like rating + " / 5".
      */}
      <span style={{ fontSize: "0.78rem", color: "#888", marginLeft: "5px" }}>
        {`${rating}`}
      </span>
    </>
  );
};


// ============================================================
// 🃏 CONCEPT: Functional Component
// ------------------------------------------------------------
// A React component is just a JavaScript function that returns JSX.
// JSX looks like HTML but it's actually JavaScript under the hood.
//
// ({ product }: Props) — this is "destructuring":
//   instead of writing (props: Props) and then props.product everywhere,
//   we pull "product" out of the props object directly.
//   It's shorthand: { product } = props
// ============================================================
const ProductCard = ({ product }: Props) => {
  return (
    // ============================================================
    // 📦 CONCEPT: className vs class
    // ------------------------------------------------------------
    // In JSX we write "className" instead of "class" because
    // "class" is a reserved keyword in JavaScript (used for classes).
    // React converts className → class in the final HTML.
    //
    // Bootstrap classes like "card", "h-100", "d-flex" etc. are
    // pre-made CSS styles from the Bootstrap library.
    //   card     → white box with border/shadow
    //   h-100    → height: 100% (fills the grid column height)
    // ============================================================
    <div
      className="card h-100"
      style={{
        // CONCEPT: Inline styles in React use a JavaScript OBJECT (not a CSS string).
        // CSS property names are camelCase: border-radius → borderRadius
        border: "none",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        // CSS transition: smoothly animates changes to transform and box-shadow
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}

      // ============================================================
      // 📦 CONCEPT: Event Handlers (onMouseEnter / onMouseLeave)
      // ------------------------------------------------------------
      // These are React's version of addEventListener("mouseenter").
      // The function receives an "event" object (e) automatically.
      //
      // e.currentTarget → the exact element the listener is on (this div).
      // We cast it to HTMLDivElement so TypeScript knows it has a .style property.
      //
      // This creates a "hover lift" effect purely in JavaScript —
      // an alternative to writing :hover in CSS.
      // ============================================================
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)";
      }}
    >

      {/* ── IMAGE SECTION ─────────────────────────────────────── */}
      <div style={{ position: "relative", background: "#f8f5f0" }}>
        {/*
          CONCEPT: Dynamic Attribute Binding
          In JSX, curly braces {} let you use JavaScript inside HTML-like code.
          src={product.image} → reads the image path from the product object
          alt={product.name}  → reads the name for accessibility (screen readers)
        */}
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{
            height: "220px",
            objectFit: "contain",  // "contain" = show whole image, no cropping
            padding: "16px",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />

        {/*
          CONCEPT: Absolute Positioning
          position: "absolute" places this badge relative to its
          nearest parent that has position: "relative" (the div above).
          top/left values control exactly where it appears.
        */}
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
            color: "#d4af37",
            fontSize: "0.7rem",
            padding: "5px 10px",
            borderRadius: "20px",
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          {product.category}
        </span>
      </div>

      {/* ── CARD BODY ─────────────────────────────────────────── */}
      {/*
        Bootstrap classes used here:
          d-flex        → display: flex  (flex container)
          flex-column   → stacks children vertically
          p-3           → padding: 1rem on all sides
      */}
      <div className="card-body d-flex flex-column p-3">

        {/* Product name */}
        <h5 className="card-title fw-bold mb-1" style={{ fontSize: "1rem", color: "#1a1a2e" }}>
          {product.name}
        </h5>

        {/*
          ============================================================
          📦 CONCEPT: Array.map() for Rendering Lists
          ------------------------------------------------------------
          .map() loops over an array and transforms each item into JSX.
          Here product.gender is an array like ["Men"] or ["Men", "Women"].
          For each gender string, we create a <span> badge.

          KEY RULE: Every element in a .map() must have a unique "key" prop.
          React uses keys to efficiently update the DOM when data changes.
          Without keys, React would re-render everything unnecessarily.
          ============================================================
        */}
        <div className="mb-2">
          {product.gender.map((g) => (
            <span
              key={g}
              style={{
                display: "inline-block",
                marginRight: "4px",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "0.68rem",
                fontWeight: 500,
                // CONCEPT: Ternary Operator (condition ? valueIfTrue : valueIfFalse)
                // If gender is "Men" → blue badge, otherwise → pink badge
                background: g === "Men" ? "#e8f0fe" : "#fce4ec",
                color:      g === "Men" ? "#1967d2" : "#c62828",
              }}
            >
              {g}
            </span>
          ))}
        </div>

        {/*
          CONCEPT: Calling a Helper Function inside JSX
          We call renderStars(product.rating) and it returns JSX (the stars).
          React renders whatever JSX a function returns — very powerful pattern.

          product.rating is a number like 4.5.
          renderStars(4.5) → ★★★★☆  4.5 / 5
        */}
        <div className="mb-2">
          {renderStars(product.rating)}
        </div>

        {/*
          ============================================================
          📦 CONCEPT: mt-auto (Bootstrap Flexbox Utility)
          ------------------------------------------------------------
          Because the card body is a flex column (d-flex flex-column),
          giving this div "mt-auto" pushes it all the way to the BOTTOM
          of the card. This keeps the price + buttons always at the bottom
          even if descriptions vary in length. Very useful for card grids.
          ============================================================
        */}
        <div className="mt-auto">

          {/*
            CONCEPT: .toLocaleString()
            Converts a number into a formatted string with commas.
            e.g.  5500 → "5,500"   so price shows as "$5,500" not "$5500"
          */}
          <p
            className="fw-bold mb-3"
            style={{
              fontSize: "1.2rem",
              // CSS Gradient Text — works by clipping a gradient to text shape
              background: "linear-gradient(135deg, #b8960c, #d4af37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {product.price.toLocaleString()}PKR
          </p>

          {/*
            Bootstrap: d-flex + gap-2 → row of buttons with spacing between them
            flex-grow-1 on the first button → it stretches to fill available width
          */}
          <div className="d-flex gap-2">

            {/* Primary button — Add to Cart */}
            <button
              className="btn flex-grow-1"
              style={{
                background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                color: "#d4af37",
                border: "none",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: 600,
                padding: "8px",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              🛒 Add to Cart
            </button>

            {/* Secondary button — View Details (eye icon) */}
            <Link to={`/Products/${product.id}`} >
            <button
              className="btn"
              style={{
                border: "1.5px solid #1a1a2e",
                color: "#1a1a2e",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: 600,
                padding: "8px 12px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "#1a1a2e";
                (e.currentTarget as HTMLButtonElement).style.color = "#d4af37";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#1a1a2e";
              }}
            >
              👁
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;