package backtofront.example.demo.Showing;

//import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowingRepository extends JpaRepository<Showing, Integer> {
    List<Showing> findByMovieIdAndShowDate(int movieId, String showDate);
    List<Showing> findByMovieId(int movieId);
    List<Showing> findByShowDateAndShowroomId(String showDate, int showroomId);
    Optional<Showing> findByShowingId(int showingId);
    Optional<Showing> findByShowTimeAndShowroomId(String showTime, int showroomId);

    @Query("select max(s.showingId) from Showing s")
    int maxShowingId();

    void deleteByShowingId(Long id);
}
