import React from "react";
import Button from "react-bootstrap/Button";
function ShowtimeButtons({ showtimes }) {
  return (
    <div className="showtime-buttons">
      {showtimes?.length > 0 ? (
        showtimes.map((time, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            className="showtime-button"
            style={{ margin: "5px" }}
          >
            {time}
          </Button>
        ))
      ) : (
        <p>No showtimes available for this date.</p>
      )}
    </div>
  );
}
export default ShowtimeButtons;
