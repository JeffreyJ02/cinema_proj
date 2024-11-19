package backtofront.example.demo.Admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backtofront.example.demo.Movie.Movie;
import backtofront.example.demo.Movie.MovieService;


@RestController
@RequestMapping("/api/admin/movies")
public class AdminMovieController {

    @Autowired
    private MovieService movieService;

    
    @PostMapping("/add")
    public ResponseEntity<String> addMovie(@RequestBody Movie movie) {
        movieService.addMovie(movie);
        return ResponseEntity.ok("Movie added successfully!");
    }

    
    @DeleteMapping("/delete/{title}")
    public ResponseEntity<String> deleteMovie(@PathVariable String title) {
        boolean isDeleted = movieService.deleteMovieByTitle(title);
        if (isDeleted) {
            return ResponseEntity.ok("Movie deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found!"); 
        }
    }
}
