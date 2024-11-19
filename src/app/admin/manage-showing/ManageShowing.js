'use client'
import React, { useState, useEffect } from 'react';
import './ManageShowing.css';

const ManageShowing = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [formData, setFormData] = useState({
    showingID: '',
    duration: '',
    showTime: '',
    showRoomId: '',
    movieId: '',
    showDate: '',
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/movies');
        const movies = await response.json();
        setMoviesList(movies);
      } catch (error) {
        alert('Error fetching movies: ' + error.message);
      }
    };

    fetchMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Check if the field is duration and if the value is negative
    if (name === 'duration' && value < 0) {
      return; // Do not update the state if the duration is negative
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send formData to your API
    console.log(formData);
  };

  return (
    <div className="manage-showing">
      <h1>Add Showing</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Duration (minutes):
          <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          min="0" // Prevents negative numbers
          />
        </label>
        <label>
          Show Time:
          <input
            type="time"
            name="showTime"
            value={formData.showTime}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Show Room ID:
          <select
            name="showRoomId"
            value={formData.showRoomId}
            onChange={handleChange}
            required
          >
            <option value="">Select Room</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <label>
          Movie:
          <select
            name="movieId"
            value={formData.movieId}
            onChange={handleChange}
            required
          >
            <option value="">Select Movie</option>
            {moviesList.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Show Date (MM/DD/YY):
          <input
            type="date"
            name="showDate"
            value={formData.showDate}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ManageShowing;