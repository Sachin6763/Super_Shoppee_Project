import React, { useState } from "react";
import "../Css/Order.css"; // Import the CSS file for styling

const Order = ({ onSubmit, user }) => {
  const [address, setAddress] = useState({
    UserID: user,
    StreetAddress: "",
    City: "",
    State: "",
    ZipCode: "",
    Country: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation or other logic here if needed

    // Call the parent component's onSubmit function with the address data
    onSubmit(address);
  };

  return (
    <div className="order-form">
      <h2>Enter Your Address</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Street Address:
          <input
            type="text"
            value={address.StreetAddress}
            onChange={(e) =>
              setAddress({ ...address, StreetAddress: e.target.value })
            }
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            value={address.City}
            onChange={(e) => setAddress({ ...address, City: e.target.value })}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            value={address.State}
            onChange={(e) => setAddress({ ...address, State: e.target.value })}
            required
          />
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            value={address.ZipCode}
            onChange={(e) =>
              setAddress({ ...address, ZipCode: e.target.value })
            }
            required
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            value={address.Country}
            onChange={(e) =>
              setAddress({ ...address, Country: e.target.value })
            }
            required
          />
        </label>
        <button className="order-submit-button" type="submit">
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default Order;
