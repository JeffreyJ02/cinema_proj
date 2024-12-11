"use client";

import {
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MovieInfo from "../../../components/MovieInfo";
import { useEffect, useState } from "react";
import { decrypt, encrypt } from "../../../../utils/encryption";

export default function Page() {
  const checkoutInfo = JSON.parse(localStorage.getItem("checkoutData") || "{}");
  const [movie, setMovie] = useState(null);
  const movieId = checkoutInfo.movieId;
  const [cardData, setCardData] = useState({
    creditCardNumber: "",
    expirationDate: "",
    cvv: "",
    cardType: "",
    name: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
  });
  const [storedCards, setStoredCards] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [userId, setUserId] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [total, setTotal] = useState(checkoutInfo.total);

  const parsedTickets = JSON.parse(checkoutInfo.tickets);
  const tickets = Object.entries(parsedTickets).reduce(
    (acc, [key, value]) => `${acc}, ${key}: ${value}`,
    ""
  );
  const parsedSeats = JSON.parse(checkoutInfo.seats);
  const seats = parsedSeats.join(", ");

  // Fetch movie by ID
  const getMovieById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/search-by-id?id=${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch movie");
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie:", error);
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
"selectedSeats": ["A4", "A5"]
}
*/
  const updateDatabaseSeats = async () => {
    try {
      const params = new URLSearchParams({
        showingId: checkoutInfo.showing_id,
      });

      checkoutInfo.seat_arr.forEach((seat) => {
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

  const getUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/user-profile?email=${localStorage.getItem(
          "userEmail"
        )}`
      );
      if (!response.ok) throw new Error("Failed to fetch user profile");
      const data = await response.json();
      setUserId(data.userId);
      return data.userId;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const getStoredCards = async () => {
    const id = await getUserProfile();
    if (!id) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/get-user-cards?user_id=${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch stored cards");
      const data = await response.json();

      const decryptedCards = data.map((card) => ({
        cardId: card.cardId,
        cardType: card.cardType ? decrypt(card.cardType) : null,
        cardNumber: card.cardNumber ? decrypt(card.cardNumber) : null,
        expirationDate: card.expirationDate
          ? decrypt(card.expirationDate)
          : null,
        securityCode: card.securityCode ? decrypt(card.securityCode) : null,
        userId: card.userId,
        addressId: card.addressId,
      }));
      setStoredCards(decryptedCards);
    } catch (error) {
      console.error("Error fetching stored cards:", error);
    }
  };

  const getAddresses = async () => {
    try {
      const id = await getUserProfile();
      console.log("User ID:", id);
      const cardResponse = await fetch(
        `http://localhost:8080/api/get-user-billing-address-ids?user_id=${id}`
      );
      if (!cardResponse.ok) throw new Error("Failed to fetch addresses");
      const addressIds = await cardResponse.json();
      console.log("Address IDs:", addressIds);

      const addresses = [];
      for (const addressId of addressIds) {
        console.log("Fetching address:", addressId);
        const addressResponse = await fetch(
          `http://localhost:8080/api/get-address-by-id?address_id=${addressId}`
        );
        if (!addressResponse.ok) throw new Error("Failed to fetch address");
        const addressData = await addressResponse.json();
        addresses.push(addressData.address);
      }

      setAddresses(addresses);
      console.log("Addresses:", addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    getMovieById(movieId);
    getStoredCards();
    getAddresses();
  }, [movieId]);

  // Handle card input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const registerCard = async (cardData) => {
    console.log("Registering card:", cardData);
    let addressNumber = await registerAddress();
    try {
      const encryptedCard = {
        cardType: encrypt(cardData.cardType),
        cardNumber: encrypt(cardData.creditCardNumber),
        expirationDate: encrypt(cardData.expirationDate),
        securityCode: encrypt(cardData.cvv),
      };

      const response = await fetch(
        `http://localhost:8080/api/register-card?user_id=${userId}&address_id=${addressNumber}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(encryptedCard),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to register card:", errorData);
        throw new Error(errorData.message || "Failed to register card");
      }

      console.log("Card registered successfully");
    } catch (error) {
      console.error("Error registering card:", error);
    }
  };

  const registerAddress = async () => {
    console.log("Registering address:", cardData);
    try {
      const addressData = {
        street: cardData.street,
        city: cardData.city,
        state: cardData.state,
        zip_code: cardData.zipCode,
        name: cardData.name,
      };

      console.log("Registering address:", addressData);

      const response = await fetch(
        `http://localhost:8080/api/register-address?user_id=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addressData),
        }
      );

      const data = await response.json();
      console.log("Address registered:", data);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to register address:", errorData);
        throw new Error(errorData.message || "Failed to register address");
      }

      console.log("Address registered successfully");
      return data;
    } catch (error) {
      console.error("Error registering address:", error);
    }
  };

  const handleAddCard = () => {
    if (!validateCardData(cardData)) return;

    registerCard(cardData).then(() => {
      setStoredCards((prev) => [
        ...prev,
        {
          cardType: cardData.cardType,
          cardNumber: cardData.creditCardNumber,
          expirationDate: cardData.expirationDate,
          cvv: "****",
        },
      ]);
      setCardData({ creditCardNumber: "", expirationDate: "", cvv: "" });
    });
  };

  const validateCardData = ({ creditCardNumber, expirationDate, cvv }) => {
    const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    const expirationPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!cardNumberPattern.test(creditCardNumber)) {
      alert("Invalid card number format. Use xxxx-xxxx-xxxx-xxxx.");
      return false;
    }
    if (!expirationPattern.test(expirationDate)) {
      alert("Invalid expiration date. Use MM/YY.");
      return false;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      alert("Invalid CVV. Must be 3 or 4 digits.");
      return false;
    }
    return true;
  };

  const submitCheckout = async () => {
    if (!storedCards[selectedCardIndex]) {
      alert("Please select a card.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/get-seats?showingId=${checkoutInfo.showing_id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch seat availability");
      }
      const seatAvailability = await response.json();
  
      const unavailableSeats = seatAvailability.map((seat) => seat.seatId);
      const hasConflict = checkoutInfo.seat_arr.some((seat) =>
        unavailableSeats.includes(seat)
      );
  
      if (hasConflict) {
        console.error("Seat conflict detected");
        alert("One or more selected seats are no longer available.");
        return;
      } else {
        console.log("No seat conflicts detected");
        //updateDatabaseSeats();
      }
    } catch (error) {
      console.error("Error fetching seat availability:",  error);
    }
  
    try {
      const checkoutData = {
        seats: checkoutInfo.seats,
        tickets: checkoutInfo.tickets,
        price: (total * 1.07).toFixed(2),
        movieTitle: movie.title,
        showDate: checkoutInfo.show_date,
        showTime: checkoutInfo.show_time,
        cardNumber: encrypt(storedCards[selectedCardIndex].cardNumber),
        userId: userId,
      };

      console.log("Checkout data:", checkoutData);

      const response = await fetch(
        `http://localhost:8080/api/register-booking?user_id=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(checkoutData),
        }
      );
      if (!response.ok) throw new Error("Checkout failed");
      const data = await response.json();
      console.log("Checkout successful:", data);
      localStorage.setItem("bookingConfirmation", JSON.stringify(checkoutData));
      window.location.href = "/booking/[movieId]/confirmation";
    } catch (error) {
      console.error(error.stack)
      console.error("Error during checkout:", error);
    }
  };

  const applyPromoCode = async (code) => {
    console.log("Applying promo code:", code);
    try {
      const response = await fetch(
        `http://localhost:8080/api/check-promo?code=${code}`
      );

      if (!response.ok) throw new Error("Failed to apply promo code");

      const data = await response.json();

      if (!data) {
        alert("Invalid promo code");
        return;
      }
      if (data.bogo) {
        console.log("BOGO promo code applied");
        const newTotal = checkoutInfo.total / 2;
        localStorage.setItem(
          "checkoutData",
          JSON.stringify({ ...checkoutInfo, total: newTotal })
        );
        setTotal(newTotal);
        alert("BOGO promo code applied. Total price is now 50% off.");
      }
      if (data.discountPercent > 0) {
        console.log("Discount promo code applied");
        const newTotal = checkoutInfo.total - data.discount;
        localStorage.setItem(
          "checkoutData",
          JSON.stringify({ ...checkoutInfo, total: newTotal })
        );
        setTotal(newTotal);
        alert(`Promo code applied. Total price is now $${newTotal}`);
      }
      console.log("Promo code end");
    } catch (error) {
      console.error("Error applying promo code:", error);
    }
  };

  const cardTypes = ["Visa", "MasterCard", "American Express", "Discover"];

  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

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
    <Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <MovieInfo movie={movie} />
      <Typography variant="body1">1. Seats</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #ccc",
          paddingY: 1,
        }}
      >
        <Typography variant="body1">My Seats:</Typography>
        <Typography variant="body1" fontWeight="bold">
          {seats}
        </Typography>
      </Box>
      <Typography variant="body1">2. Tickets</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #ccc",
          paddingY: 1,
        }}
      >
        <Typography variant="body1">My Tickets:</Typography>
        <Typography variant="body1" fontWeight="bold">
          {tickets.substring(2)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #ccc",
          paddingY: 1,
        }}
      >
        <Typography variant="body1">My Total:</Typography>
        <Typography variant="body1" fontWeight="bold">
          ${total} + tax: ${(total * 0.07).toFixed(2)} = $
          {(total * 1.07).toFixed(2)}
        </Typography>
      </Box>
      <Typography variant="body1">3. Payment</Typography>
      <div>
        <p>Stored Cards:</p>
        {storedCards.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {storedCards.map((card, index) => (
              <Button
                key={index}
                variant={index === selectedCardIndex ? "contained" : "outlined"}
                onClick={() => setSelectedCardIndex(index)}
                sx={{ justifyContent: "space-between" }}
              >
                **** **** **** {card.cardNumber.slice(-4)} -{" "}
                {card.expirationDate}
              </Button>
            ))}
          </Box>
        ) : (
          <p>No stored cards available.</p>
        )}
        <TextField
          label="Credit Card Number"
          name="creditCardNumber"
          type="tel"
          inputMode="numeric"
          pattern="\d{4}-\d{4}-\d{4}-\d{4}"
          autoComplete="cc-number"
          maxLength="19"
          placeholder="xxxx-xxxx-xxxx-xxxx"
          value={cardData.creditCardNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          id="type-select"
          select
          label="Card Type"
          value={cardData.cardType || ""}
          fullWidth
          onChange={(e) =>
            handleChange({
              target: { name: "cardType", value: e.target.value },
            })
          }
        >
          {cardTypes.map((ctype) => (
            <MenuItem key={ctype} value={ctype}>
              {ctype}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Expiration Date"
          name="expirationDate"
          type="tel"
          inputMode="numeric"
          pattern="(0[1-9]|1[0-2])\/\d{2}"
          maxLength="5"
          placeholder="MM/YY"
          value={cardData.expirationDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="CVV"
          name="cvv"
          type="tel"
          inputMode="numeric"
          pattern="\d{3,4}"
          maxLength="4"
          placeholder="123"
          value={cardData.cvv}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Name"
          name="name"
          value={cardData.name}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Street"
          name="street"
          value={cardData.street}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={cardData.city}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Zip Code"
          name="zipCode"
          value={cardData.zipCode}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          id="state-select"
          select
          label="State"
          fullWidth
          value={cardData.state}
          onChange={(e) =>
            handleChange({
              target: { name: "state", value: e.target.value },
            })
          }
        >
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleAddCard}>
          Add Card
        </Button>
        <Button variant="outlined" onClick={() => setShowAddCard(false)}>
          Cancel
        </Button>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #ccc",
          paddingY: 1,
        }}
      >
        <TextField
          label="Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => applyPromoCode(promoCode)}
        >
          Apply
        </Button>
      </Box>

      <Button variant="contained" color="primary" onClick={submitCheckout}>
        Confirm Payment
      </Button>
    </Box>
  );
}
