import React, { useState } from "react";
import Slider from "react-slick";
import DateCard from "./DateCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrevArrow(props) {
  const { onClick, className } = props;
  return (
    <div onClick={onClick} className={className} style={{ display: "flex" }}>
      <ArrowBackIcon style={{ color: "white" }} onClick={onClick} />
    </div>
  );
}

function NextArrow(props) {
  const { onClick, className } = props;
  return (
    <div onClick={onClick} className={className} style={{ display: "flex" }}>
      <ArrowForwardIcon style={{ color: "white" }} onClick={onClick} />
    </div>
  );
}

function DateCarousel({ onDateSelect, dates }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(4, dates.length),
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const formatDate = (date) =>
    date.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "100%",
        padding: "20px",
      }}
    >
      <Slider {...settings} style={{ width: "100%", maxWidth: "600px" }}>
        {dates.map((date, index) => {
          const localDate = new Date(date);
          return (
            <DateCard
              key={index}
              current={localDate}
              label={formatDate(localDate)}
              isSelected={selectedDate.getTime() === localDate.getTime()}
              onDateSelect={handleDateSelect}
            />
          );
        })}
      </Slider>
    </Box>
  );
}

export default DateCarousel;
