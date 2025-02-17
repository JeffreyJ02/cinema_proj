"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { confirmationEmail } from "../../../../utils/email";

export default function ConfirmationPage() {
  const [bookingDetails, setBookingDetails] = useState(null);

  const sendConfirmationEmail = async (emailAddress, details) => {
    console.log("sendConfirmationEmail called");
    console.log("Booking details email:", details);
    try {
      confirmationEmail({
        user_email: emailAddress,
        message: `Your booking has been confirmed for ${details.movieTitle} at ${details.showTime} on ${details.showDate}!`,
      });
      console.log("Confirmation email sent to:", emailAddress);
    } catch (error) {
      console.error("Error sending confirmation email:", error);
    }
  };


  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem("bookingConfirmation"));
    const userEmail = localStorage.getItem("userEmail");

    if (bookingData) {
      setBookingDetails(bookingData);

      sendConfirmationEmail(userEmail, bookingData);
    } else {
      console.error("No booking details found in localStorage.");
    }
  }, []);

  if (!bookingDetails) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h4" color="primary">
        Booking Confirmed!
      </Typography>
      <Typography variant="body1">
        Thank you for booking with us. Here are your booking details:
      </Typography>
      <Box
        sx={{
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "600px",
          textAlign: "left",
        }}
      >
        <Typography variant="body1">
          <strong>Booking ID:</strong> {bookingDetails.bookingId}
        </Typography>
        <Typography variant="body1">
          <strong>Movie:</strong> {bookingDetails.movieTitle}
        </Typography>
        <Typography variant="body1">
          <strong>Show Date:</strong> {bookingDetails.showDate}
        </Typography>
        <Typography variant="body1">
          <strong>Show Time:</strong> {bookingDetails.showTime}
        </Typography>
        <Typography variant="body1">
          <strong>Seats:</strong> {bookingDetails.seats}
        </Typography>
        <Typography variant="body1">
          <strong>Tickets:</strong>{" "}
          {bookingDetails.tickets}
        </Typography>
        <Typography variant="body1">
          <strong>Total Price:</strong> ${bookingDetails.price}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = "/")}
      >
        Back to Home
      </Button>
    </Box>
  );
}
