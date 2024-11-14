import React, { useState } from "react";
import Slider from "react-slick";
import DateCard from "./DateCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrevArrow(props) {
  const { onClick, className } = props;
  return (
    <div onClick={onClick} className={`arrow ${className}`}>
      <ArrowBackIcon style={{ color: "white" }} />
    </div>
  );
}

function NextArrow(props) {
  const { onClick, className } = props;
  return (
    <div onClick={onClick} className={`arrow ${className}`}>
      <ArrowForwardIcon style={{ color: "white" }} />
    </div>
  );
}

function DateCarousel({ onDateSelect }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const pDates = Array.from({ length: 7 }, (_, i) => new Date(new Date().setDate(new Date().getDate() + i)));
  const [selectedDate, setSelectedDate] = useState(pDates[0]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {pDates.map((date, index) => (
          <DateCard
            key={index}
            current={date}
            isSelected={selectedDate.getTime() === date.getTime()}
            onDateSelect={handleDateSelect} // Pass handleDateSelect to DateCard
          />
        ))}
      </Slider>
    </div>
  );
}

export default DateCarousel;
