import React from 'react';
import Button from 'react-bootstrap/Button';
import YoutubeEmbed from './YoutubeEmbed';
import { useState } from 'react';

{/* MovieCard component, goes into the MovieCarousel*/}
const MovieCard = ({ movie }) => {
  const trailerButton = () => {
        setShowTrailer(true)
  }
  const [showTrailer, setShowTrailer] = useState(false);
  return (
    <div>
        <img src={movie.img} alt={movie.name} style={{ width: '100%', height: 'auto' }}/>
        <div className="movie-info">
          <h3>{movie.name}</h3>
          <Button variant="primary" onClick={trailerButton}>Watch Trailer</Button>
          {showTrailer && <YoutubeEmbed trailerLink={movie.trailerLink} />}
        </div>
    </div>
  );
};

export default MovieCard;
