import Button from 'react-bootstrap/Button';
import YoutubeEmbed from './YoutubeEmbed';
import { useState, React } from 'react';

{/* MovieCard component, goes into the MovieCarousel*/}
const MovieCard = ({ movie }) => {
  {/* Function to show trailer */}
  const trailerButton = () => {
        setShowTrailer(true)
  }
  {/* State for showing trailer */}
  const [showTrailer, setShowTrailer] = useState(false);
  return (
    <div>
        {/* Movie image */}     
        <img src={movie.img} alt={movie.name} style={{ width: '100%', height: 'auto' }}/>
        <div className="movie-info">
          <h3>{movie.name}</h3>
          {/* Button to show trailer, onClick sets state to true adn
          conditionally renders the Youtube embed*/}
          <Button variant="primary" onClick={trailerButton}>Watch Trailer</Button>
          {showTrailer && <YoutubeEmbed trailerLink={movie.trailerLink} />}
        </div>
    </div>
  );
};

export default MovieCard;
