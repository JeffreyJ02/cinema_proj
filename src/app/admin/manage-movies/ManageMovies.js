'use client'

import React, { useState } from 'react';
import './ManageMovies.css';

const ManageMovies = () => {
  const [movie, setMovie] = useState('');
  const [showTime, setShowTime] = useState('');
  const [theatre, setTheatre] = useState('');
  const [details, setDetails] = useState({
    director: '',
    cast: '',
    rating: '',
    duration: '',
  });
  const [ticketPrice, setTicketPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TO DO: Implement update logic here
    console.log('Update movie details:', movie, showTime, theatre, details, ticketPrice);
  };

  return (
    <div className="manage-movies-container">
      <h1>Manage Movies</h1>
      <form onSubmit={handleSubmit}>
        <label>Movie:</label>
        <select value={movie} onChange={(e) => setMovie(e.target.value)}>
          <option value="">Select a movie</option>
          <option value="Interstellar">Interstellar</option>
          <option value="Movie 2">Movie 2</option>
          <option value="Movie 3">Movie 3</option>
        </select>
        <br />
        <label>Edit Show Time:</label>
        <input type="text" value={showTime} onChange={(e) => setShowTime(e.target.value)} />
        <br />
        <label>Edit Theatre:</label>
        <input type="text" value={theatre} onChange={(e) => setTheatre(e.target.value)} />
        <br />
        <label>Edit Details:</label>
        <div className="details-container">
          <label>Director:</label>
          <input type="text" value={details.director} onChange={(e) => setDetails({ ...details, director: e.target.value })} />
          <br />
          <label>Cast:</label>
          <input type="text" value={details.cast} onChange={(e) => setDetails({ ...details, cast: e.target.value })} />
          <br />
          <label>Rating:</label>
          <input type="text" value={details.rating} onChange={(e) => setDetails({ ...details, rating: e.target.value })} />
          <br />
          <label>Duration:</label>
          <input type="text" value={details.duration} onChange={(e) => setDetails({ ...details, duration: e.target.value })} />
        </div>
        <br />
        <label>Edit Ticket Price:</label>
        <input type="text" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
        <br />
        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
  );
};

export default ManageMovies;