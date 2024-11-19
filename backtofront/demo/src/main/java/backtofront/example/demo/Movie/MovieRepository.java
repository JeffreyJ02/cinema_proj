package backtofront.example.demo.Movie;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    Optional<Movie> findByMovieId(int id);
    
    List<Movie> findByTitleContaining(String title);
}
