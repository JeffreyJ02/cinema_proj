package backtofront.example.demo.Showing;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backtofront.example.demo.Movie.Movie;

@Repository
public interface ShowingRepository extends JpaRepository<Showing, Integer> {
    List<Showing> findByMovieIdAndShowDate(Movie movie, Date showDate);
    List<Showing> findByMovieId(Movie movie);
    Optional<Showing> findByShowingId(Long id);
    Optional<Showing> findByShowTimeAndShowroomId(String showTime, int showroomId);
    
    @Query("select max(s.showingId) from Showing s")
    int maxShowingId();

    // List<Showing> getAllShowings

    void deleteByShowingId(Long id);
}
