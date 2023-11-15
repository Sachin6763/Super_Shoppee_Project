import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../Css/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
    setUser(null);
    setIsDropdownOpen(false); // Close the dropdown menu when the user logs out
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/home" className="brand-link">
          Super Shoppe
        </Link>
      </div>
      <div className="links">
        {user ? (
          <>
            <Link to="/home">Home</Link>
            <Link to="/product">Product</Link>
            <Link to="/cart">Cart</Link>
            {/* <Link to="/order">Order</Link> */}
            <div className="user-icon" onClick={toggleDropdown}>
              <FaUser />
              {isDropdownOpen && (
                <div className="dropdown">
                  {/* You can add more options here */}
                  <span>{user}</span>
                  <span onClick={handleLogout}>Logout</span>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
