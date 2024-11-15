"use client";

import React, { useState, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import DateCarousel from "../../components/DateCarousel";
import ShowtimeButtons from "../../components/ShowtimeButtons";
import MovieInfo from "../../components/MovieInfo";
import TicketView from "../../components/TicketView";
import Button from "@mui/material/Button";
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

  the array I recieve will be of length 16

  If the array looks something like this [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
  This means that the first seat is taken, the last seat is taken, and all other seats are available.
  In the rendered grid A0 and D3 will be disabled as those seats are taken
  */
  const getSeatAvailability = async (showtimeId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/seats?id=${showtimeId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch seat availability");
      }
      const data = await response.json();
      console.log("Got seat availability: ", data);
      setSeatAvailability(data);
    } catch (error) {
      console.error("Error fetching seat availability:", error);
    }
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
  "seatAvailability": [1, 0, 0, 1, 0, 1, 1, 0, 0, 1]
  }
  */
  const updateDatabaseSeats = async () => {
    try {
      updatedAvailability = seatAvailability.map((seat, index) =>
        selectedSeats.includes(index) ? 1 : seat
      );
      const response = await fetch(`http://localhost:8080/api/update-seats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          showtimeId: selectedShowtime.id,
          seatAvailability: updatedAvailability,
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
    setSeatAvailability(generatePlaceholderAvailability(showroomSeats[showtime.showroom]));
    setSelectedSeats([]);
  };

  const generatePlaceholderAvailability = (nSeats) => {
    const totalSeats = nSeats * nSeats;
    return Array(totalSeats)
      .fill(0)
      .map((_, i) => (i % 5 === 0 ? 1 : 0));
  };

  const placeholderMovie = {
    img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg",
    id: 1,
    runtime: "1 HR 45 MIN",
    name: "Movie 1",
    trailerLink:
      "https://www.youtube.com/embed/zSWdZVtXT7E?si=w7ReOmp4NXxSyE3V",
    synopsis: "A movie about space",
    rating: "PG-13",
    cast: ["Actor 1", "Actor 2", "Actor 3"],
  };

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
    1: 5,
    2: 6,	
    3: 3,
    4: 4,
    5: 2,
    6: 3,
  };

  // When the component mounts, fetch the movie by ID
  //  NOTE CURRENTLY ON PLACEHOLDER DATA
  useEffect(() => {
    //getMovieById(movieId);
    //getMovieShowtimes(movieId);
    setMovie(placeholderMovie);
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
                {selectedShowtime && (
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
                <TicketView numTickets={selectedSeats.length}/>
              </div>
            </div>
          </div>
          <Button variant="contained" color="primary" className="checkout">
            Continue to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
