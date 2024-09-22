package backtofront.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
public interface MovieRepository extends JpaRepository<Movie, Long> {

    // Custom query to search for movies by title
    List<Movie> findByTitleContaining(String title);
}
