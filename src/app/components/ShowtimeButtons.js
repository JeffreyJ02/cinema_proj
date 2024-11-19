import React from "react";
import { Box, Button } from "@mui/material";

function ShowtimeButtons({ showtimes, onShowtimeSelect, selectedShowtime }) {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} padding={2}>
      {showtimes.length > 0 ? (
        showtimes.map((showtime) => (
          <Button
            key={showtime.id}
            variant={selectedShowtime?.id === showtime.id ? "contained" : "outlined"}
            color="primary"
            onClick={() => onShowtimeSelect(showtime)}
          >
            {showtime.time}
          </Button>
        ))
      ) : (
        <p>No showtimes available for this date.</p>
      )}
    </Box>
  );
}

export default ShowtimeButtons;
