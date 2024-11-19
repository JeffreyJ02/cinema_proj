'use client'
import React, { useState, useEffect } from 'react';
import './ManageShowing.css';

const ManageShowing = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [formData, setFormData] = useState({
    showingID: '',
    duration: '',
    showTime: '',
    showroomId: '',
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
          Showing ID:
          <input
            type="text"
            name="showingID"
            value={formData.showingID}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Duration (minutes):
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
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
            name="showroomId"
            value={formData.showroomId}
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