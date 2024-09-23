import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import YoutubeEmbed from './YoutubeEmbed';

const MovieInfo = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  // Function to show the trailer
  const trailerButton = () => {
    setShowTrailer(true);
  };

  return (
    <div>
      <div className="poster-container">
        <h3>{movie.name}</h3>
        <img src={movie.img} alt={movie.name} className="movie-poster" />
        <div className="movie-info">
          {/* Button to show trailer, onClick sets state to true */}
          {/* <Button variant="primary" onClick={trailerButton}>Watch Trailer</Button> */}
          {showTrailer && <YoutubeEmbed embedId={movie.trailerLink} />}
        </div>
      </div>
      {/* Info about the movie, shown using info from given movie obkect */}
      <div className="info">
            <h3>Synopsis</h3>
          <p>{movie.synopsis}</p>
          <h3>Rating</h3>
            <p>{movie.rating}</p>
      </div>
    </div>
  );
};

export default MovieInfo;
