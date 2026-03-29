
import React from "react";
import "./Features.css";
import { FaTruck, FaUndo, FaHeadset, FaShieldAlt } from "react-icons/fa";
const Features = () => {

  // 🔹 Concept: ARRAY (data-driven UI)
  // Instead of hardcoding, we store data in an array
  const features = [
    { title: "Easy Returns",icon: <FaUndo /> , desc: "Hassle free returns - Return within 14 days" },
    { title: "Warranty",icon:<FaShieldAlt/>, desc: "1 year warranty - 100 % autenticity guaranteed" },
    { title: "Online Order", icon:<FaTruck/>,desc: "Fast delivery - Delivered within 3 to 4 days" },
    { title: "24/7 Support",icon:<FaHeadset/>, desc: "Any kind of Complaint or need help?  We are here to help" },
  ];

  return (
    <div className="container my-3">

      {/* 🔹 Bootstrap Grid System */}
      {/* row = horizontal layout */}
      <div className="row">

        {/* 🔹 map() → loop through array and create UI */}
        {features.map((item, index) => (

          <div key={index} className="col-md-3 mb-3 d-flex">
            {/* col-md-3 → 4 boxes in one row. d-flex added to help stretch cards vertically if needed in future */}

            <div className="feature-box p-3 text-center border rounded w-100">

              {/* 🔹 JSX → HTML inside React */}
              {/* Add the icon here, make it large and provide some spacing */}
              <div className="mb-3 fs-1 text-warning">
                {item.icon}
              </div>
              <h5>{item.title}</h5>
              <p>{item.desc}</p>

            </div>
          </div>

        ))}

      </div>
    </div>
  );
};


export default Features;