package backtofront.example.demo.ShowSeat;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ShowSeatService {

    private final ShowSeatRepository showSeatRepository;

    public ShowSeatService(ShowSeatRepository showSeatRepository) {
        this.showSeatRepository = showSeatRepository;
    }

    public void registerShowSeat(String seatId, int showingId) {
        ShowSeat showSeat = new ShowSeat();
        showSeat.setSeatId(seatId);
        showSeat.setShowingId(showingId);
        showSeatRepository.save(showSeat);
    }

    public List<ShowSeat> findByShowingId(int showingId) {
        return showSeatRepository.findByShowingId(showingId);
    }

    public List<ShowSeat> findBySeatId(String seatId) {
        return showSeatRepository.findBySeatId(seatId);
    }
}