package backtofront.example.demo.Movie;

import java.util.List;
import java.util.Optional;

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
        return movieRepository.findAll();
    }

    public List<Movie> findMoviesByTitle(String title) {
        List<Movie> movies = movieRepository.findByTitleContaining(title);
        logger.info("Movies matching title '{}': {}", title, movies);
        return movies;
    }

    public Movie findMovieById(int id) {
        return movieRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Movie not found"));
    }

    public void addMovie(Movie movie) {
        movieRepository.save(movie);
        logger.info("Added movie: {}", movie);
    }

    public List<Movie> findMoviesByGenre(String genre) {
        return movieRepository.findByGenreIgnoreCase(genre);
    }

    public boolean deleteMovieByTitle(String title) {
        // Search for the movie by the exact title
        Optional<Movie> movie = movieRepository.findByTitle(title);
    
        // If movie is found, delete it
        if (movie.isPresent()) {
            movieRepository.delete(movie.get());
            logger.info("Deleted movie with title: {}", title);
            return true;
        } else {
            // Log the warning if no movie is found
            System.out.println(title);
            logger.warn("No movie found with title: {}", title);
            return false;
        }
    }
}


