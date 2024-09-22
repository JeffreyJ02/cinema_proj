'use client'
import React from "react";
import Button from "react-bootstrap/Button";
import OrderConfirmation from "./OrderConfirmation";
import { useState } from "react";
import OrderDetails from "./OrderDetails";
export default function Checkout( {order} ) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return <OrderConfirmation order={order}/>;
    }

    return (
        <div>
            <h1>Checkout</h1>
            <h2>Payment Information</h2>
            <Button variant="btn btn-outline-primary" href="/payment">Use Saved Card</Button>
            <form onSubmit={handleSubmit}>
                <label>
                    Card Number:
                    <input type="text" name="cardNumber" />
                </label>
                <label>
                    Expiration Date:
                    <input type="text" name="expirationDate" />
                </label>
                <label>
                    CVV:
                    <input type="text" name="cvv" />
                </label>
                <label>
                    Billing Address:
                    <input type="text" name="billingAddress" />
                </label>
                <label>
                    Zip Code:
                    <input type="text" name="zipCode" />
                </label>
                <label>
                    Promo Code:
                    <input type="text" name="promoCode" />
                    <Button variant="btn btn-outline-primary">Apply</Button>
                </label>
                <button type="submit">Checkout</button>
            </form>
            <OrderDetails order={order} />
        </div>
    );
}