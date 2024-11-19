package backtofront.example.demo.ShowSeat;

import java.util.List;
import org.springframework.stereotype.Service;
import backtofront.example.demo.Showing.Showing;

@Service
public class ShowSeatService {

    private final ShowSeatRepository showSeatRepository;

    public ShowSeatService(ShowSeatRepository showSeatRepository) {
        this.showSeatRepository = showSeatRepository;
    }

    public void registerShowSeat(String seatId, Showing showing) {
        ShowSeat showSeat = new ShowSeat();
        showSeat.setSeatId(seatId);
        showSeat.setShowing(showing);
        showSeatRepository.save(showSeat);
    }

    public List<ShowSeat> findByShowing(Showing showing) {
        return showSeatRepository.findByShowing(showing);
    }
}