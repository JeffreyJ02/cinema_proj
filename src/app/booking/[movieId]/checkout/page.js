"use client";

import { Button } from "@mui/material";

export default function Page() {
  const checkoutInfo = JSON.parse(localStorage.getItem("checkoutData") || "{}");

  console.log(checkoutInfo.tickets);

  return (
    <div>
      <h1>Checkout</h1>
      <p>Movie: {checkoutInfo.movieId}</p>
      <p>My Seats: {checkoutInfo.seats}</p>
      <p>My Tickets: {checkoutInfo.tickets}</p>
        <p>My Total: {checkoutInfo.total}</p>
      <p>Checkout page content</p>
      <Button variant="contained" color="primary">
        Confirm Payment
        </Button>
    </div>
  );
};
