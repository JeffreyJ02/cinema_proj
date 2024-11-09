package backtofront.example.demo;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MovieService {
    private static final Logger logger = LoggerFactory.getLogger(MovieService.class);

    @Autowired
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    
    public List<Movie> getAllMovies() {
        List<Movie> movies = movieRepository.findAll();
        logger.info("Fetched Movies: {}", movies);
        return movies;
    }

    
    public List<Movie> findMoviesByTitle(String title) {
        List<Movie> movies = movieRepository.findByTitleContaining(title);
        logger.info("Movies matching title '{}': {}", title, movies);
        return movies;
    }

    public Movie findMovieById(Long id) {
        return movieRepository.findByMovieId(id)
                .orElseThrow(() -> new IllegalArgumentException("Movie not found"));
    }
    
    public void addMovie(Movie movie) {
        movieRepository.save(movie);
        logger.info("Added movie: {}", movie);
    }

    
    public boolean deleteMovieById(Integer id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            logger.info("Deleted movie with ID: {}", id);
            return true;
        }
        logger.warn("Movie with ID: {} not found", id);
        return false;
    }
}


