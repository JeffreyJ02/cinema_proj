package backtofront.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:5500"})
@RequestMapping("/api")
public class MovieController {

    
    public MovieRepository movieRepository;
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        System.out.println("Fetched movies: " + movies);
        return movies;
    }
    
    

    // Search for movies by title
    @GetMapping("/search-by-title")
    public List<Movie> getMovieByTitle(@RequestParam(required = false) String title) {
        if (title == null || title.isEmpty()) {
            return new ArrayList<>();  // Return an empty list if no title is provided
        }
        return movieService.findMoviesByTitle(title);  // Use movieService for the search
    }

    // Search for movies by title
    @GetMapping("/search-by-id")
    public Movie getMovieById(@RequestParam(required = false) Long id) {
        return movieService.findMovieById(id);  // Use movieService for the search
    }

    @GetMapping("/movies-by-genre")
public List<Movie> getMoviesByGenre(@RequestParam String genre) {
    if (genre == null || genre.isEmpty()) {
        return new ArrayList<>();  // Return an empty list if no genre is provided
    }
    return movieService.findMoviesByGenre(genre);  // Use movieService for the search
}

@DeleteMapping("/delete/{id}")
public ResponseEntity<String> deleteMovie(@PathVariable Integer id) {
    boolean isDeleted = movieService.deleteMovieById(id);
    if (isDeleted) {
        return ResponseEntity.ok("Movie deleted successfully!");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found!");
    }
}


    
}

