import React from "react";
import Button from "react-bootstrap/Button";
import "./SeatGrid.css";

const SeatGrid = ({ nSeats, availability, selectedSeats, setSelectedSeats }) => {
  // Handle toggle for seat selection
  const handleSeatToggle = (seat) => {
    setSelectedSeats(
      (prevSelectedSeats) =>
        prevSelectedSeats.includes(seat)
          ? prevSelectedSeats.filter((s) => s !== seat) // Remove seat if already selected
          : [...prevSelectedSeats, seat] // Add seat if not selected
    );
  };

  // Render the grid of buttons
  const renderGrid = () => {
    const buttons = [];
    for (let row = 0; row < nSeats; row++) {
      const buttonRow = [];
      for (let col = 0; col < nSeats; col++) {
        const index = row * nSeats + col;
        const seatLabel = `${"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[row]}${col + 1}`; // Generate seat label
        const isSelected = selectedSeats.includes(seatLabel);
        buttonRow.push(
          <Button
            key={index}
            variant={availability[index] ? "secondary" : isSelected ? "info" : "primary"} // Changes the styling absed on state
            disabled={availability[index]} // Disable button if seat is unavailable
            className={`seat-button ${isSelected ? "selected" : ""}`}
            onClick={() => !availability[index] && handleSeatToggle(seatLabel)} // Toggle seat selection if available
          >
            {seatLabel}
          </Button>
        );
      }
      buttons.push(
        <div className="button-row" key={row}>
          {buttonRow}
        </div>
      );
    }
    return buttons;
  };

  return (
    <div className="seat-grid">
      {renderGrid()}
    </div>
  );
};

export default SeatGrid;
