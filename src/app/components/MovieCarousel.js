import React from 'react';
import MovieCard from './MovieCard';
import Slider from 'react-slick';

const MovieCarousel = ({ movies, header }) => {
    {/* Placeholder movies */}
  const placeholderMovies = [
    { img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg", id: 1, name: "Movie 1", rating: "PG-13", trailerLink: "https://www.youtube.com/embed/zSWdZVtXT7E?si=w7ReOmp4NXxSyE3V" },
    { img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg", id: 2, name: "Movie 2", rating: "PG-13", trailerLink: "#" },
    { img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg", id: 3, name: "Movie 3", rating: "PG-13", trailerLink: "#" },
    { img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg", id: 1, name: "Movie 4", rating: "PG-13", trailerLink: "#" },
    { img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg", id: 1, name: "Movie 5", rating: "PG-13", trailerLink: "#" },
    { img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg", id: 1, name: "Movie 6", rating: "PG-13", trailerLink: "#" },
    { img: "https://m.media-amazon.com/images/I/91JnoM0khKL._AC_UF894,1000_QL80_.jpg", id: 1, name: "Movie 7", rating: "PG-13", trailerLink: "#" },
  ];

  {/* Settings for carousel from react-slick, taken from https://react-slick.neostack.com/*/}
  const settings = {
    centerPadding: "60px",
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
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
    <div>
        <h1>{header}</h1>
        <Slider {...settings}>
            {/* Loop through movies provided in movies param, currently set to placeholder */}
            {placeholderMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
                ))}
        </Slider>
    </div>
  );
};

export default MovieCarousel;
