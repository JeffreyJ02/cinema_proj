import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./MovieCard.css";
import YoutubeEmbed from "./YoutubeEmbed";

const MovieCard = ({ movie }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBook = () => {
    console.log(movie);
    console.log(movie.movieId);
    window.location.href = `/booking/${movie.movieId}`;
  }

  return (
    <>
      {/* Modal to show trailer */}
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title} - Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <YoutubeEmbed trailerLink={movie.trailerUrl} />
          <div className="movie-details">
            <p>
              <strong>Description:</strong>
              {movie.description}
            </p>
            <p>
              <strong>Release Date:</strong>
              {movie.releaseDate}
            </p>
            <p>
              <strong>Director:</strong>
              {movie.director}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Movie Card */}
      <div className="card">
        <img
          /* Movie image */
          src={movie.imageUrl}
          alt={movie.title}
        />
        {/* Button to show trailer, onClick sets state to true and
            conditionally renders the Youtube embed */}
        <div className="movie-buttons">
          <Button variant="primary" onClick={handleShow}>
            Watch Trailer
          </Button>
          <Button variant="primary" onClick={handleBook}>
            Book
          </Button>
        </div>

        {/* Display the age rating fetched from the database */}
        <div className="rating">{movie.ageRating}</div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
