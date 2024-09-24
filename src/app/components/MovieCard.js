import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './MovieCard.css'; // Ensure the correct path to your CSS file
import YoutubeEmbed from './YoutubeEmbed';

const MovieCard = ({ movie }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Modal to show trailer */}
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title} - Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <YoutubeEmbed trailerLink={movie.trailerUrl} />
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
          src={movie.imageUrl} // Use the correct property for image URL
          alt={movie.title}
        />
        <div className="movie-buttons">
          <Button variant="primary" onClick={handleShow}>Watch Trailer</Button>
          <Button variant="primary" href="/booking">Book</Button>
        </div>
        <div className="rating">PG-13</div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
        </div>
      </div>
    </>
  );
};

export default MovieCard;

