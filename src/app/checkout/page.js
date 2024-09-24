import React from "react";
import CustomNavbar from "../components/CustomNavbar";
import OrderDetails from "../components/OrderDetails";
import Checkout from "../components/Checkout";
import styles from "./page.css";

export default function Home() {
  const placeholderMovie = {
    img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg",
    id: 1,
    name: "Movie 1",
    trailerLink: "https://www.youtube.com/embed/zSWdZVtXT7E?si=w7ReOmp4NXxSyE3V",
    synopsis: "A movie about space",
    rating: "PG-13",
  };

  const placeholderOrder = {
    location: "AMC Theater",
    seats: "A1, A2, A3",
    tickets: {
      adult: 2,
      child: 1,
      senior: 0,
      adultPrice: 10,
      childPrice: 5,
      seniorPrice: 7,
    },
  };

  return (
    <div>
      <CustomNavbar />
      <div className="checkout-content">
        <Checkout order={placeholderOrder} />
        <OrderDetails order={placeholderOrder} />
      </div>
    </div>
  );
}
