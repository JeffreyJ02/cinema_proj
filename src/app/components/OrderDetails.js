import React from "react";

const OrderDetails = ( {order} ) => {
    // Decompose the order object
    const { adult, child, senior, adultPrice, childPrice, seniorPrice } = order.tickets;

    // Calculate the total price for each ticket type
    const total = adult * adultPrice + child * childPrice + senior * seniorPrice;
    const totalAdult = adult * adultPrice;
    const totalChild = child * childPrice;
    const totalSenior = senior * seniorPrice;

    return (
        <div>
        <h1>Order Details</h1>
        <p>My Seats: {order.seats}</p>
        <p>My Tickets: </p>
        <ul>
            <li>Adult: {adult} x ${adultPrice} = ${totalAdult}</li>
            <li>Child: {child} x ${childPrice} = ${totalChild}</li>
            <li>Senior: {senior} x ${seniorPrice} = ${totalSenior}</li>
        </ul>
        <p>Total: ${total}</p>
        </div>
    );
};

export default OrderDetails;