import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './DateCarousel.css';
import next from 'next';
import DateCard from './DateCard';

function SwipeToSlide() {
    // Settings from https://react-slick.neostack.com/docs/example/responsive
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // Placeholder array of dates, today, tomorrow, day after tomorrow, etc
  const pDates = [
    new Date(),
    new Date(new Date().setDate(new Date().getDate() + 1)),
    new Date(new Date().setDate(new Date().getDate() + 2)),
    new Date(new Date().setDate(new Date().getDate() + 3)),
    new Date(new Date().setDate(new Date().getDate() + 4)),
    new Date(new Date().setDate(new Date().getDate() + 5)),
    new Date(new Date().setDate(new Date().getDate() + 6)),
  ];

  // Arrow component for the slider, from react-slick documentation
  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'grey', right: '-25px'}}
        onClick={onClick}
      />
    );
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {/* Map through the placeholder dates and create a DateCard for each */}
        {pDates.map((date, index) => (
          <DateCard key={index} current={date}/>
        ))}
      </Slider>
    </div>
  );
}

export default SwipeToSlide;
