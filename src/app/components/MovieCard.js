import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './MovieCard.css';
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
        /* Movie image */
          src={movie.imageUrl}
          alt={movie.title}
        />
         {/* Button to show trailer, onClick sets state to true adn
            conditionally renders the Youtube embed*/}
            {/*<Button variant="primary" onClick={trailerButton}>Watch Trailer</Button>*/}
        <div className="movie-buttons">
          <Button variant="primary" onClick={handleShow}>Watch Trailer</Button>
          <Button variant="primary" href="/booking">Book</Button>
           {/*showTrailer && <YoutubeEmbed trailerLink={movie.trailerLink} />*/}
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

