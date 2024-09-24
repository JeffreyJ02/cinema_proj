import Button from 'react-bootstrap/Button';
import YoutubeEmbed from './YoutubeEmbed';
import { useState, React } from 'react';
import styles from './MovieCard.css';
import Modal from 'react-bootstrap/Modal';

{/* MovieCard component, goes into the MovieCarousel*/}
const MovieCard = ({ movie }) => {

  // React logic to show modal, from react-bootsrap documentation
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Modal to show trailer, from react-bootsrap */}
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{movie.title} - Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <YoutubeEmbed trailer={movie.trailerLink} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Container for the movie card itself */}
      <div className='container-mov'>
        <div className="card">
          {/* Movie image */}
          <img src={movie.poster} alt={movie.title} style={{ width: '100%', height: 'auto' }}/>
          <h6 className='rating'>{movie.rating}</h6>
          <div className="movie-buttons">
            {/* Button to show trailer, onClick sets state to true adn
            conditionally renders the Youtube embed*/}
            {/*<Button variant="primary" onClick={trailerButton}>Watch Trailer</Button>*/}
            <Button variant="primary" onClick={handleShow}>Trailer</Button>
            <Button variant="primary" href="booking" >Book</Button>
            {/*showTrailer && <YoutubeEmbed trailerLink={movie.trailerLink} />*/}
          </div>
        </div>
        <div className="movie-info">
            <h3>{movie.title}</h3>
          </div>
      </div>
    </>
  );
};

export default MovieCard;
