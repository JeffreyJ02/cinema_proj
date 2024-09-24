import React from "react";
import "./OrderDetails.css"; // Ensure the CSS file is imported

const OrderDetails = ({ order }) => {
  // Decompose the order object
  const { adult, child, senior, adultPrice, childPrice, seniorPrice } = order.tickets;

  // Calculate the total price for each ticket type
  const total = adult * adultPrice + child * childPrice + senior * seniorPrice;
  const totalAdult = adult * adultPrice;
  const totalChild = child * childPrice;
  const totalSenior = senior * seniorPrice;

  return (
    <div className="order-details-card">
      <div className="order-details-header">Order Details</div>
      <div className="order-details-body">
        <p><strong>My Seats:</strong> {order.seats}</p>
        <h5>My Tickets:</h5>
        <ul className="order-details-list">
          <li>Adult: {adult} x ${adultPrice} = ${totalAdult}</li>
          <li>Child: {child} x ${childPrice} = ${totalChild}</li>
          <li>Senior: {senior} x ${seniorPrice} = ${totalSenior}</li>
        </ul>
        <p className="total-amount">Total: ${total}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
