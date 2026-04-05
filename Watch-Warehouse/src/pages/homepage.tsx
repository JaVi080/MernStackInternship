import React, { useState } from "react";
import { Link } from "react-router-dom";
import Features from "../Components/Features";
import ProductList from "../Components/productList";
import Footer from "../Components/footer";
import CategoryBar from "../Components/CategoryBar";

const HomePage = () => {
  return (
    <>
      <CategoryBar/>
      {/* Carousel */}
      <div id="demo" className="carousel slide" data-bs-ride="carousel"style={{ marginBottom: "70px" }}>

        {/* Indicators/dots */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        </div>

        {/* The slideshow/carousel */}
        <div className="carousel-inner">
          <div className="carousel-item active">
        <img src="https://img.pikbest.com/origin/06/43/50/946pIkbEsTIUu.jpg!w700wp" alt="Watch 1" className="d-block w-100" style={{ height: "500px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/free-vector/dark-style-realistic-smart-watch-horizontal-banner-with-advertising-site-vector-illustration_1284-30193.jpg?semt=ais_incoming&w=740&q=80" alt="Smart watch" className="d-block w-100" style={{ height: "500px", objectFit: "cover" }} />
          </div>
          <div className="carousel-item">
            <img src="https://luxurywatchbuyer.com/wp-content/uploads/2015/04/banner-2.png" alt="luxary watches" className="d-block w-100" style={{ height: "500px", objectFit: "cover" }} />
          </div>
        </div>

        {/* Left and right controls/icons */}
        <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* for features  */}
      <Features/>
      <ProductList limit={8} />
    </>
  );
};

export default HomePage;