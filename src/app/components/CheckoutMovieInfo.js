import React from 'react';
import './CheckoutMovieInfo.css';

const CheckoutMovieInfo = ({ movie }) => {

  return (
    <div className='movie-box'>
      <div className="poster-container">
        <img src={movie.img} alt={movie.name} className="movie-poster" />
      </div>
      <div className="info">
            <h3>{movie.name}</h3>
            <p>{movie.rating}</p>
      </div>
    </div>
  );
};

export default CheckoutMovieInfo;
