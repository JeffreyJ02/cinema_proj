package backtofront.example.demo.Controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backtofront.example.demo.Movie.*;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // change to 'add-movie'
    @PostMapping("/movies")
    public ResponseEntity<String> addMovie(@RequestBody Movie movie) {
        try {
            movieService.addMovie(movie);
            return ResponseEntity.status(HttpStatus.CREATED).body("Movie added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding movie: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/movies/delete/{title}")
    public ResponseEntity<String> deleteMovieByTitle(@PathVariable String title) {
        boolean isDeleted = movieService.deleteMovieByTitle(title);
        if (isDeleted) {
            return ResponseEntity.ok("Movie deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found!");
        }
    }
    
    // change to 'get-all-movies'
    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        return movieService.getAllMovies();
    }

    @GetMapping("/search-by-title")
    public List<Movie> getMoviesByTitle(@RequestParam(required = false) String title) {
        return movieService.findMoviesByTitle(title);
    }    
    
    @GetMapping("/search-by-id")
    public Movie getMovieById(@RequestParam(required = false) int id) {
        return movieService.findMovieById(id);
    }

    @GetMapping("/search-by-genre")
    public List<Movie> getMoviesByGenre(@RequestParam String genre) {
        return movieService.findMoviesByGenre(genre);
    }

    @GetMapping("/search-by-category")
    public List<Movie> getMoviesByCategory(@RequestParam String category) {
        return movieService.findMoviesByCategory(category);
    }
}