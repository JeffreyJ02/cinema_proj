package backtofront.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    Optional<Movie> findById(Long id);
    List<Movie> findByGenreIgnoreCase(String genre);
    List<Movie> findByTitleContaining(String title);
}
