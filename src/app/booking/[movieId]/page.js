"use client";

import React, { useState, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import DateCarousel from "../../components/DateCarousel";
import ShowtimeButtons from "../../components/ShowtimeButtons";
import MovieInfo from "../../components/MovieInfo";
import TicketView from "../../components/TicketView";
import {
  Button,
  Box,
  CircularProgress,
  Paper,
  Typography,
  Grid2,
} from "@mui/material";
import SeatGrid from "../../components/SeatGrid";
import { get } from "http";
import { format } from "path";
import { useRouter } from "next/navigation";

export default function Home({ params }) {
  // params come from the URL, e.g. /booking/1
  const { movieId } = params;
  const router = useRouter();

  // React hooks for managing state
  const [activeTab, setActiveTab] = useState("home");
  const [movie, setMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [movieShowtimes, setMovieShowtimes] = useState({});
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seatAvailability, setSeatAvailability] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketCounts, setTicketCounts] = useState({
    Adult: 0,
    Child: 0,
    Senior: 0,
  });

  const showroomSeats = {
    1: 4,
    2: 5,
    3: 6,
  };

  // Function to fetch movie by ID
  const getMovieById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/search-by-id?id=${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }
      const data = await response.json();
      console.log("Got movie: ", data);
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  // Function to format showtimes data
  const formatShowtimes = (showtimes) => {
    // New formatted dates object
    const formatted = {};
    // Loop through each showtime
    showtimes.forEach((show) => {
      const { showDate, showingId, showroomId, showTime } = show;
      // If this date dosent yet exist, create it in the formatted object
      if (!formatted[showDate]) {
        formatted[showDate] = [];
      }
      // Push the formatted showtime into the array for this date
      formatted[showDate].push({
        id: showingId,
        showroom: showroomId,
        time: showTime,
      });
    });
    return formatted;
  };

  // Function to fetch showtimes by movie ID
  const getShowtimes = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/get-showing-by-movie-id?movieId=${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch showtimes");
      }
      const data = await response.json();
      console.log("Got showtimes: ", data);

      // Format the showtimes
      const formattedShowtimes = formatShowtimes(data);
      console.log("Formatted Showtimes: ", formattedShowtimes);

      // Set the formatted data to state
      setMovieShowtimes(formattedShowtimes);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  // Function to fetch seat availability by showtime ID
  const getSeatAvailability = async (showtime) => {
    console.log("Fetching seat availability for showtime:", showtime);
    try {
      const response = await fetch(
        `http://localhost:8080/api/get-seats?showingId=${showtime.id}`
      );
      const occupiedSeatsData = await response.json();

      // This creates an array of 0s matching the total number of seats in the showroom
      const occupiedSeats = occupiedSeatsData.map((seat) => seat.seatId);
      const totalSeats = showroomSeats[showtime.showroom] ** 2;
      const availabilityArray = Array(totalSeats).fill(0);

      // This sets the occupied seats to 1 in the array
      occupiedSeats.forEach((seat) => {
        // Convert seat label to row and column indices
        const row = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(seat[0]);
        // Convert the column number to an integer
        const col = parseInt(seat.slice(1), 10) - 1;
        // Calculate the index of the seat in the array
        const index = row * showroomSeats[showtime.showroom] + col;
        // Set the seat to occupied
        availabilityArray[index] = 1;
      });

      setSeatAvailability(availabilityArray);
    } catch (error) {
      console.error("Error fetching seat availability:", error);
    }
    console.log("Seat availability:", seatAvailability);
  };

  // Function to update seat availability in the database
  /*
  Here is what I am expecting on the frontend:
  I do the api call to update the seat availability for a specific showtime.
  Once the user selects their seats, I combine the arrays of seat availability and selected seats.
  I then send a POST request to the backend with the updated seat availability.
  Ex.
  {
  "showtimeId": 2,
  "selectedSeats": ["A4", "A5"]
  }
  */
  const updateDatabaseSeats = async () => {
    try {
      const params = new URLSearchParams({
        showingId: selectedShowtime.id,
      });

      selectedSeats.forEach((seat) => {
        params.append("seatAvailability", seat);
      });

      const response = await fetch(
        `http://localhost:8080/api/update-seats?${params.toString()}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) throw new Error("Failed to update seat availability");
      console.log("Seats successfully updated in the database.");
    } catch (error) {
      console.error("Error updating seats:", error);
    }
  };

  // Function sets selected date in state selectedDate
  const handleDateSelect = (date) => {
    const localDateStr = date.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const isoDate = date.toISOString().split("T")[0];
    setSelectedDate(isoDate);
    setSelectedShowtime(null);
    setSeatAvailability([]);
    setSelectedSeats([]);
    console.log("Selected date (local timezone):", localDateStr);
    console.log("Selected date (ISO):", isoDate);
  };

  // When a tab is clicked, set the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // When a showtime is selected, set the selected showtime
  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
    getSeatAvailability(showtime);
    setSelectedSeats([]);
  };

  // When the component mounts, fetch the movie by ID
  useEffect(() => {
    console.log("Fetching movie with ID:", movieId);
    getMovieById(movieId);
    getShowtimes(movieId);
  }, [movieId]);

  const updateTicketCount = (type, action, max) => {
    setTicketCounts((prevCounts) => {
      const totalTickets = Object.values(prevCounts).reduce((sum, count) => sum + count, 0);
  
      if (action === "Add") {
        if (totalTickets + 1 > max) {
          return prevCounts;
        }
        return {
          ...prevCounts,
          [type]: Math.min(prevCounts[type] + 1, selectedSeats.length),
        };
      } else if (action === "Remove") {
        return {
          ...prevCounts,
          [type]: Math.max(prevCounts[type] - 1, 0),
        };
      }
      return prevCounts;
    });
  };
  
  

  const handleCheckout = () => {
    console.log("Checkout");
    
    const checkoutData = {
      movieId,
      seats: JSON.stringify(selectedSeats),
      tickets: JSON.stringify(ticketCounts),
      total: (ticketCounts.Adult * 10 + ticketCounts.Child * 5 + ticketCounts.Senior * 7),
      showing_id: selectedShowtime.id,
      show_date: selectedDate,
      show_time: selectedShowtime.time,
      seat_arr: selectedSeats,
    }

    console.log("Checkout data:", checkoutData);
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    console.log("Redirecting to checkout page");  
    router.push(`/booking/${movieId}/checkout`);
  };

  // If movie is not fetched yet, show a loading message
  if (!movie)
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

  return (
    <div>
      <CustomNavbar />
      <div className="main-content">
        <div className="content-layout">
          <div className="movie-details">
            <MovieInfo movie={movie} />
          </div>
          <div className="user-interactable-content">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === "home" ? "active" : ""}`}
                  id="home-tab"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected={activeTab === "home"}
                  onClick={() => handleTabClick("home")}
                >
                  Showtimes
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "profile" ? "active" : ""
                  }`}
                  id="profile-tab"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected={activeTab === "profile"}
                  onClick={() => handleTabClick("profile")}
                >
                  Seats
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "contact" ? "active" : ""
                  }`}
                  id="contact-tab"
                  type="button"
                  role="tab"
                  aria-controls="contact"
                  aria-selected={activeTab === "contact"}
                  onClick={() => handleTabClick("contact")}
                >
                  Tickets
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className={`tab-pane fade ${
                  activeTab === "home" ? "show active" : ""
                }`}
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="showtime-content">
                  <DateCarousel
                    onDateSelect={handleDateSelect}
                    dates={Object.keys(movieShowtimes).map(
                      (dateStr) => new Date(`${dateStr}T00:00:00-05:00`)
                    )}
                  />
                  <ShowtimeButtons
                    showtimes={movieShowtimes[selectedDate] || []}
                    onShowtimeSelect={handleShowtimeSelect}
                    selectedShowtime={selectedShowtime}
                  />
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "profile" ? "show active" : ""
                }`}
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                {selectedShowtime ? (
                  <Box
                    sx={{
                      p: 3,
                      mt: 2,
                      borderRadius: 2,
                      backgroundColor: "white",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                      SCREEN
                    </Typography>
                    <SeatGrid
                      nSeats={showroomSeats[selectedShowtime.showroom]}
                      availability={seatAvailability}
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                    />
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      <strong>Selected Seats:</strong>{" "}
                      {selectedSeats.length > 0
                        ? selectedSeats.join(", ")
                        : "None"}
                    </Typography>
                  </Box>
                ) : (
                  <p>Select a showtime</p>
                )}
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "contact" ? "show active" : ""
                }`}
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <p>Please select {selectedSeats.length} seats</p>
                <TicketView
                  ticketCounts={ticketCounts}
                  onTicketChange={updateTicketCount}
                  maxVal={selectedSeats.length}
                />
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="checkout"
            sx={{
              position: "fixed",
              bottom: "16px",
              right: "16px",
              zIndex: 1000,
              color: "#fff",
              transition: "background-color 0.3s, transform 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={handleCheckout}
          >
            Continue to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
