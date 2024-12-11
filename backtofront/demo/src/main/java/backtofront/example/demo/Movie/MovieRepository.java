package backtofront.example.demo.Movie;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByGenreIgnoreCase(String genre);
    List<Movie> findByTitleContaining(String title);
    List<Movie> findByCategory(String category);
    Optional<Movie> findByMovieId(int id);
    Optional<Movie> findByTitle(String title);
}
