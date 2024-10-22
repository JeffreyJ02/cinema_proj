import './MovieInfo.css';

const MovieInfo = ({ movie }) => {

  return (
    <div className="movie-info-container">
      {/* Left side with title and image */}
      <div className="movie-container">
        <h3 className="movie-title">{movie.name}</h3>
        <img src={movie.img} alt={movie.name} className="movie-poster" />
      </div>

      {/* Right side with synopsis and rating */}
      <div className="info-container">
        <p>{movie.rating} | {movie.runtime} | Cast: {movie.cast.join(", ")}</p>
        <p>{movie.synopsis}</p>
      </div>
    </div>
  );
};

export default MovieInfo;
