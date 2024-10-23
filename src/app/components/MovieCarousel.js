import Slider from 'react-slick';
import MovieCard from './MovieCard';

const MovieCarousel = ({ movies, header }) => {
  const settings = {
    centerPadding: "90px",
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
        {movies./*filter((movie) => movie.playing === movie.header).*/map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
