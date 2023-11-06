import React from "react";
import { Link } from "react-router-dom";
import "../Css/Home.css";

const featuredProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
  },
  {
    id: 2,
    name: "Product 2",
    price: 39.99,
  },
  {
    id: 3,
    name: "Product 3",
    price: 49.99,
  },
];

export default function Home({ user }) {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Our Store!</h1>
        <p className="hero-description">
          Explore a wide range of products crafted just for you.
        </p>
        <Link to={user ? "/product" : "/login"} className="hero-button">
          {user ? "Go to Products" : "Login"}
        </Link>
      </div>
      <div className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <ul className="product-list">
          {featuredProducts.map((product) => (
            <li key={product.id} className="product-item">
              <span className="product-name">{product.name}</span>
              <span className="product-price">${product.price}</span>
              <button className="add-to-cart-button">Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="about-section">
        <h2 className="section-title">About Us</h2>
        <p className="about-description">
          We are dedicated to providing high-quality products and excellent
          customer service. Explore our store and find your perfect items.
        </p>
      </div>
    </div>
  );
}
