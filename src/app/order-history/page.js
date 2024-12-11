"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import CustomNavbar from "../components/CustomNavbar";
export default function OrderHistory() {
  const [bookings, setBookings] = useState(null);

  const placeholderBooking = {
    bookingId: 1,
    movieTitle: "Movie Title",
    showDate: "2022-01-01",
    showTime: "12:00 PM",
    seats: ["A1", "A2"],
    price: 20,
  };

  const getUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user-profile?email=${localStorage.getItem(
          "userEmail"
        )}`
      );
      if (!response.ok) throw new Error("Failed to fetch user profile");
      const data = await response.json();
      return data.userId;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const fetchBookings = async () => {
    const id = await getUserProfile();
    if (!id) return;
    console.log("User ID:", id);
    try {
        const response = await fetch(`http://localhost:8080/api/get-user-bookings?userId=${id}`);
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const data = await response.json();
        console.log(data);
        setBookings(data);
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }  
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (!bookings) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          No Orders Found
        </Typography>
        <Typography variant="body1">
          It seems you haven't made any bookings yet.
        </Typography>
        <Button variant="contained" color="primary" href="/">
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <div>
      <CustomNavbar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Order History
        </Typography>
        <List>
          {bookings.map((booking) => (
            <Box key={booking.bookingId}>
              <ListItem>
                <ListItemText
                  primary={`Movie: ${booking.movieTitle}`}
                  secondary={
                    <>
                      <Typography variant="body2">
                        <strong>Show Date:</strong> {booking.showDate}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Show Time:</strong> {booking.showTime}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Seats:</strong> {booking.seats}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Total Price:</strong> $
                        {booking.price.toFixed(2)}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </Box>
          ))}
        </List>
        <Button variant="contained" color="primary" href="/">
          Back to Home
        </Button>
      </Box>
    </div>
  );
}
