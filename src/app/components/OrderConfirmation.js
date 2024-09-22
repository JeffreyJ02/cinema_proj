import React from "react";

const OrderConfirmation = ({ order }) => {
    return (
        <div>
            <h1>Order Confirmation</h1>
            <p>Thank you for your purchase!</p>
            <p>Location: {order.location}</p>
            <p>My Seats: {order.seats}</p>
            <p>My Tickets: </p>
            <ul>
                <li>Adult: {order.tickets.adult}</li>
                <li>Child: {order.tickets.child}</li>
                <li>Senior: {order.tickets.senior}</li>
            </ul>
            <p>Total: ${order.total}</p>
        </div>
    );
}

export default OrderConfirmation;