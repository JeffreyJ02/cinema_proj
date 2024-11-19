import './MovieInfo.css';

const MovieInfo = ({ movie }) => {
  return (
    <div className="movie-info-container">
      {/* Left side with title and image */}
      <div className="movie-container">
        <h3 className="movie-title">{movie.title}</h3>
        <img src={movie.imageUrl} alt={movie.title} className="movie-poster" />
      </div>

      {/* Right side with synopsis and rating */}
      <div className="info-container">
        <p>{movie.ageRating} | Released: {movie.releaseDate}</p>
        <p>Director: {movie.director} | Producer: {movie.producer}</p>
        <p>Genre: {movie.genre}</p>
        <p>{movie.description}</p>
      </div>
    </div>
  );
};

export default MovieInfo;
