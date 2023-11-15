import React, { useEffect, useState, onSubmit } from "react";
import Payment from "./Payment";
import Order from "./Order";
import "../Css/PaymentForm.css";

export default function PaymentForm({
  onSubmit,
  user,
  cartItems,
  setcartItems,
}) {
  const [address, setAddress] = useState({
    UserID: user,
    StreetAddress: "",
    City: "",
    State: "",
    ZipCode: "",
    Country: "",
  });

  const [personalInfo, setpersonalInfo] = useState({
    firstName: user,
    lastName: "",
    mobile: "",
  });
  let cnt = 0;
  return (
    <div className="payment-form-container">
      <div className="incontainer">
        <div className="left-part-payment">
          <Order
            address={address}
            setAddress={setAddress}
            personalInfo={personalInfo}
            setpersonalInfo={setpersonalInfo}
          />
        </div>
        <div className="right-part-payment">
          <div className="cart-item-content">
            <table border="2px solid red">
              <thead>
                <th>ProductId</th>
                <th>ProductName</th>
                <th>Price($)</th>
                <th>Quantity</th>
              </thead>
              <tbody>
                {cartItems &&
                  cartItems.map((ele) => {
                    {
                      /* setcnt(cnt + 1); */
                    }
                    console.log("here");
                    cnt++;
                    const { ProductId, ProductName, Price, Quantity } = ele;
                    return (
                      <tr>
                        <td>{cnt}</td>
                        <td>{ProductName}</td>
                        <td>{Price}</td>
                        <td>{Quantity}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="payment-container">
            <Payment
              user={user}
              address={address}
              setAddress={setAddress}
              userInfo={personalInfo}
              setpersonalInfo={setpersonalInfo}
              cartItems={cartItems}
              setcartItems={setcartItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
