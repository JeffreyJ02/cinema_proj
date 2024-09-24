import axios from 'axios'; // For API requests
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel styles
import 'slick-carousel/slick/slick.css';
import MovieCard from './MovieCard';

const MovieCarousel = ({ header }) => {
  const [movies, setMovies] = useState([]); // State to hold movie data

  // Fetch movie data from the backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/movies');
        setMovies(response.data); // Set the movie data into the state
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Settings for the react-slick carousel
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
      {movies.length > 0 ? ( // Check if movies are available
        <Slider {...settings}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Slider>
      ) : (
        <p>Loading movies...</p> // Loading state
      )}
    </div>
  );
};

export default MovieCarousel;
