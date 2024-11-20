package backtofront.example.demo.ShowSeat;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShowSeatRepository extends JpaRepository<ShowSeat, Integer> {
    List<ShowSeat> findByShowingId(int showingId);
}
