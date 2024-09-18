import React from 'react';
{/* MovieCard component, goes into the MovieCarousel*/}
const MovieCard = ({ movie }) => {
  return (
    <div>
        <img src={movie.img} alt={movie.name} style={{ width: '100%', height: 'auto' }}/>
            <div className="movie-info">
            <h3>{movie.name}</h3>
            <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer">
                Watch Trailer
            </a>
        </div>
    </div>
    
  );
};

export default MovieCard;
