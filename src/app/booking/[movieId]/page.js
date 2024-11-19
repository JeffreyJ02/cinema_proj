"use client";

import React, { useState, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import DateCarousel from "../../components/DateCarousel";
import ShowtimeButtons from "../../components/ShowtimeButtons";
import MovieInfo from "../../components/MovieInfo";
import TicketView from "../../components/TicketView";
import { Button, Box } from "@mui/material";
import SeatGrid from "../../components/SeatGrid";
import { get } from "http";

export default function Home({ params }) {
  // params come from the URL, e.g. /booking/1
  const { movieId } = params;

  // React hooks for managing state
  const [activeTab, setActiveTab] = useState("home");
  const [movie, setMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [movieShowtimes, setMovieShowtimes] = useState({});
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seatAvailability, setSeatAvailability] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const placeholderSeats = ["A1", "A2", "B3", "C1"];

  const placeholderShowtimes = {
    "2022-12-25": [
      { id: 1, showroom: 1, time: "12:00 PM" },
      { id: 2, showroom: 1, time: "3:00 PM" },
      { id: 3, showroom: 1, time: "6:00 PM" },
    ],
    "2022-12-26": [
      { id: 4, showroom: 2, time: "12:00 PM" },
      { id: 5, showroom: 2, time: "4:00 PM" },
      { id: 6, showroom: 2, time: "6:00 PM" },
    ],
    "2022-12-27": [
      { id: 7, showroom: 3, time: "11:00 AM" },
      { id: 8, showroom: 3, time: "2:00 PM" },
      { id: 9, showroom: 3, time: "5:00 PM" },
    ],
    "2022-12-28": [
      { id: 10, showroom: 4, time: "10:00 AM" },
      { id: 11, showroom: 4, time: "1:00 PM" },
      { id: 12, showroom: 4, time: "4:00 PM" },
    ],
    "2022-12-29": [
      { id: 13, showroom: 5, time: "9:00 AM" },
      { id: 14, showroom: 5, time: "12:00 PM" },
      { id: 15, showroom: 5, time: "3:00 PM" },
    ],
    "2022-12-30": [
      { id: 16, showroom: 6, time: "8:00 AM" },
      { id: 17, showroom: 6, time: "11:00 AM" },
      { id: 18, showroom: 6, time: "2:00 PM" },
    ],
  };

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

  // Function to fetch showtimes by movie ID
  /*
  Here is what I am expecting on the frontend:
  I do the api call to get the showtimes for a specific movie id.
  The api call will return an object with each date as the key and an array of showtimes as the value.
  For example:
  {
    "2022-12-25": [
      { id: 1, showroom: 1, time: "12:00 PM" },
      { id: 2, showroom: 1, time: "3:00 PM" },
      { id: 3, showroom: 1, time: "6:00 PM" },
    ],
    "2022-12-26": [
      { id: 4, showroom: 2, time: "12:00 PM" },
      { id: 5, showroom: 2, time: "4:00 PM" },
      { id: 6, showroom: 2, time: "6:00 PM" },
    ],
  }
  */
  const getShowtimes = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/showtimes?id=${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch showtimes");
      }
      const data = await response.json();
      console.log("Got showtimes: ", data);
      setMovieShowtimes(data);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  // Function to fetch seat availability by showtime ID
  /*
  Here is what I am expecting on the frontend:
  I do the api call to get the seat availability for a specific showtime id.
  The api call will return an array of boolean values, where each value represents the availability of a seat.
  For example:

  if showroom 4 has n=4 seats
  const showroomSeats {
    1: 5
    2: 6
    3: 3
    4: 4
  }
  then there are n*n = 16 seats

  return an array of strings for the occupied seats ie. ["A1", "A2"] those two seats are occupied
  */

  const getSeatAvailability = async (showtime) => {
    try {
      const occupiedSeats = placeholderSeats;
      /*const occupiedSeats = await fetch(
        `http://localhost:8080/api/seats?id=${showtimeId}`
      ); */
      console.log("Got seat availability: ", occupiedSeats);
      
      // This creates an array of 0s matching the total number of seats in the showroom
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
      console.log("Selected Seats: ", selectedSeats);
      const response = await fetch(`http://localhost:8080/api/update-seats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          showTimeId: selectedShowtime.id,
          seatAvailability: selectedSeats,
        }),
      });

      if (!response.ok) throw new Error("Failed to update seat availability");
      console.log("Seats successfully updated in the database.");

      setSelectedSeats([]);
    } catch (error) {
      console.error("Error updating seats:", error);
    }
  };

  // Function sets selected date in state selectedDate
  const handleDateSelect = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    setSelectedShowtime(null);
    setSeatAvailability([]);
    setSelectedSeats([]);
    console.log("Selected date:", formattedDate);
  };

  // When a tab is clicked, set the active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // When a showtime is selected, set the selected showtime
  // NOTE CURRENTLY ON PLACEHOLDER DATA
  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
    // setSeatAvailability(getSeatAvaliability(showtime.showroom));
    getSeatAvailability(showtime);
    setSelectedSeats([]);
  };

  // When the component mounts, fetch the movie by ID
  //  NOTE CURRENTLY ON PLACEHOLDER DATA
  useEffect(() => {
    console.log("Fetching movie with ID:", movieId);
    getMovieById(movieId);
    //getMovieShowtimes(movieId);
    //setMovie(placeholderMovie);
    setMovieShowtimes(placeholderShowtimes);
  }, [movieId]);

  // If movie is not fetched yet, show a loading message
  if (!movie) return <div>Loading movie details...</div>;

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
                      (dateStr) => new Date(dateStr)
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
                  <div className="seats-content">
                    <h6>Showroom: {selectedShowtime.showroom}</h6>
                    <SeatGrid
                      nSeats={showroomSeats[selectedShowtime.showroom]}
                      availability={seatAvailability}
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                    />
                    <p>Selected Seats: {selectedSeats.join(", ") || "None"}</p>
                  </div>
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
                <TicketView numTickets={selectedSeats.length} />
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="checkout"
            sx={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              zIndex: 1000,
            }}
            onClick={updateDatabaseSeats}
          >
            Continue to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
