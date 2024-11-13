package backtofront.example.demo.Showing;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backtofront.example.demo.Movie.Movie;

@Repository
public interface ShowingRepository extends JpaRepository<Showing, Integer> {
    Optional<Showing> findByMovieId(Movie movie);
    Optional<Showing> findByShowingId(Long id); 

    @Query("select max(s.showingId) from Showing s")
    int maxShowingId();

    boolean existsByEmail(String email);
    
    // List<Showing> getAllShowings

    void deleteByShowingId(Long id);
}
