package backtofront.example.demo.Movie;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    Optional<Movie> findByMovieId(Long id);

    @Query("select max(m.movieId) from Movie m")
    int maxMovieId();
    
    List<Movie> findByTitleContaining(String title);
}
