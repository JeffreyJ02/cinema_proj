package backtofront.example.demo.ShowSeat;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backtofront.example.demo.Showing.Showing;

@Repository
public interface ShowSeatRepository extends JpaRepository<ShowSeat, Integer> {
    List<ShowSeat> findByShowing(Showing showing);
}
