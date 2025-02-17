"use client";

import { useEffect, useState } from "react";
import "./ManageMovies.css";
import { fetchMovies } from "@/utils/manageMoviesAPIFacade";
import { addMovies } from "@/utils/manageMoviesAPIFacade";
import { deleteMovie } from "@/utils/manageMoviesAPIFacade";

const ManageMovies = () => {
  const [movie, setMovie] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ageRating, setAgeRating] = useState("");
  const [director, setDirector] = useState("");
  const [producer, setProducer] = useState("");
  const [moviesList, setMoviesList] = useState([]);

  // Fetch movies list when the component loads
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movies = await fetchMovies();
        setMoviesList(movies);
      } catch (error) {
        alert("Error fetching movies site: " + error.message);
      }
    };

    loadMovies();
  }, []);

  const handleAddMovie = async (event) => {
    event.preventDefault();
    const movieData = {
      title,
      description,
      releaseDate,
      genre,
      trailerUrl,
      category,
      imageUrl,
      ageRating,
      director,
      producer,
    };

    try {
      const message = await addMovies(movieData);
      alert(message);

      try {
        const movies = await fetchMovies();
        setMoviesList(movies);
      } catch (error) {
        alert("Error fetching movies site: " + error.message);
      }
    } catch (error) {
      alert("Error adding movie: " + error.message);
    }
  };

  const handleDeleteMovie = async (event) => {
    event.preventDefault();
    if (!movie) {
      alert("Please select a movie to delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this movie?")) {
      return;
    }

    try {
      const message = await deleteMovie(movie);
      alert(message);

      try {
        const movies = await fetchMovies();
        setMoviesList(movies);
      } catch (error) {
        alert("Error fetching movies site: " + error.message);
      }
    } catch (error) {
      alert("Error deleting movie: " + error.message);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setReleaseDate("");
    setGenre("");
    setTrailerUrl("");
    setCategory("");
    setImageUrl("");
    setAgeRating("");
    setDirector("");
    setProducer("");
  };

  return (
    <div className="manage-movies-container">
      <h1>Add Movie</h1>

      {/* Add Movie Section */}
      <form onSubmit={handleAddMovie}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />

        <label>Release Date:</label>
        <input
          type="text"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <br />

        <label>Genre:</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <br />

        <label>Trailer URL:</label>
        <input
          type="text"
          value={trailerUrl}
          onChange={(e) => setTrailerUrl(e.target.value)}
        />
        <br />

        <label>Category:</label>
        <select   
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="Coming Soon">Coming Soon</option>
          <option value="Currently Running">Currently Running</option>
        </select>
        <br />

        <label>Image URL:</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <br />

        <label>Age Rating:</label>
        <input
          type="text"
          value={ageRating}
          onChange={(e) => setAgeRating(e.target.value)}
        />
        <br />

        <label>Director:</label>
        <input
          type="text"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <br />

        <label>Producer:</label>
        <input
          type="text"
          value={producer}
          onChange={(e) => setProducer(e.target.value)}
        />
        <br />

        <button type="submit" className="update-button">
          Add Movie
        </button>
      </form>

      {/* Delete Movie Section */}
      <h2>Delete Movie</h2>
      <form onSubmit={handleDeleteMovie}>
        <label>Select Movie to Delete:</label>
        <select
          value={movie}
          onChange={(e) => setMovie(e.target.value)}
          required
        >
          <option value="">Select a movie</option>
          {moviesList.map((movie, index) => (
            <option key={movie.id || index} value={movie.title}>
              {movie.title}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Delete Movie</button>
      </form>
    </div>
  );
};

export default ManageMovies;


