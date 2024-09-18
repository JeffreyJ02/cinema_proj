import React from 'react';
import MovieCard from './MovieCard';
import Slider from 'react-slick';

const MovieCarousel = ({ movies }) => {
  const placeholderMovies = [
    { img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg", id: 1, name: "Movie 1", trailerLink: "#" },
    { img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg", id: 2, name: "Movie 2", trailerLink: "#" },
    { img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg", id: 3, name: "Movie 3", trailerLink: "#" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {placeholderMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Slider>
  );
};

export default MovieCarousel;
