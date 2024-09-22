'use client'
{/* use client, components are server*/}

import React, { useState } from 'react';
import CheckoutMovieInfo from '../components/CheckoutMovieInfo';
import OrderDetails from '../components/OrderDetails';
import { Button } from 'react-bootstrap';
import OrderConfirmation from '../components/OrderConfirmation';

export default function Home() {
    const [isCheckout, setIsCheckout] = useState(false);

    const placeholderMovie = {
        img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg",
        id: 1,
        name: "Movie 1",
        trailerLink: "https://www.youtube.com/embed/zSWdZVtXT7E?si=w7ReOmp4NXxSyE3V",
        synopsis: "A movie about space",
        rating: "PG-13"
    };

    const placeholderOrder = {
        location: "AMC Theater",
        seats: "A1, A2, A3",
        tickets: {adult: 2, child: 1, senior: 0, adultPrice: 10, childPrice: 5, seniorPrice: 7}
    };

    const handleCheckout = () => {
        setIsCheckout(true);
    };

    return (
        <div>
            <CheckoutMovieInfo movie={placeholderMovie} />
            {!isCheckout ? (
                <>
                    <OrderDetails order={placeholderOrder} />
                    <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
                </>
            ) : (
                <OrderConfirmation order={placeholderOrder} />
            )}
        </div>
    );
}