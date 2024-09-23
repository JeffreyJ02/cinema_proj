import React from 'react';
import './CheckoutMovieInfo.css';

const CheckoutMovieInfo = ({ movie }) => {

  {/* This is the movie info component that displays the movie poster and rating given a movie object*/}
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
