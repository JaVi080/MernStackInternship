
import React from "react";
import { Link } from "react-router";

const CategoryBar = () => {
  const categories = ["Sports", "Luxury", "Smart Watches","Man Watches","Women Watches"];
  const brands = ["Casio", "Fossil", "Rolex"];

  return (
    <div className="bg-light border-bottom py-5" >
      <div className="container d-flex flex-wrap align-items-center justify-content-around border border-2 border-warning rounded-3 p-2 px-4 shadow-sm" style={styles.categoryBar}>

        {/* Categories */}
        <div className="d-flex gap-2">
          {categories.map((cat) => (
            <Link to={`/category/${cat.toLowerCase()}`}>
              <button key={cat} className="btn btn-outline-warning btn-sm text-warning category-btn">
                {cat}
              </button>
            </Link>
          ))}
        </div>

        {/* Brand Filter as Dropdown Button */}
        <div className="dropdown category-dropdown">
          <button className="btn btn-outline-warning btn-sm text-warning dropdown-toggle" type="button" 
          id="brandDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            All Brands
          </button>
          <ul className="dropdown-menu" aria-labelledby="brandDropdown">
            <li><button className="dropdown-item" type="button">All Brands</button></li>
            {brands.map((brand) => (
              <li key={brand}><button className="dropdown-item" type="button">{brand}</button></li>
            ))}
          </ul>
        </div>

        {/* Search */}
        <div>
          <input 
            type="text"
            className="form-control form-control-sm text-warning outline-warning"
            placeholder="Search watches..."
          />
        </div>

      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  categoryBar: {
    // backgroundColor: "#f8f9fa",
    // marginTop: "0px",
    background: "#0f0f0f",  
    borderBottom: "1px solid #dee2e6",
    padding: "0.5rem 1rem",

  },
}

// Custom styles for dropdown hover and item color
const customDropdownStyles = `
  .category-dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0; // Remove jump
  }
  .category-dropdown .dropdown-menu {
    min-width: 8rem;
    background: #222;
    border: 1px solid #ffc107;
  }
  .category-dropdown .dropdown-item {
    color: #ffc107;
    background: transparent;
    transition: background 0.2s, color 0.2s;
  }
  .category-dropdown .dropdown-item:hover, .category-dropdown .dropdown-item:focus {
    color: #fff;
    background: #ffc107;
  }
  .category-dropdown .dropdown-toggle {
    transition: color 0.2s;
  }
  .category-dropdown:hover .dropdown-toggle,
  .category-dropdown .dropdown-toggle:focus {
    color: #fff !important;
  }
  .category-btn {
    transition: all 0.3s ease; /* Makes the transition smooth */
  }

  .category-btn:hover {
    color: #fff !important;           /* Changes text to white on hover */
    background-color: #ffc107 !important; /* Keeps the gold background */
    border-color: #ffc107 !important;
  }
`;

const CategoryBarWithStyles = () => (
  <>
    <style>{customDropdownStyles}</style>
    <CategoryBar />
  </>
);

export default CategoryBarWithStyles;