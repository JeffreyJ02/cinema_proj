package backtofront.example.demo.Showing;

import org.springframework.stereotype.Service;

@Service
public class ShowingService {

    private final ShowingRepository showingRepository;

    public ShowingService(ShowingRepository showingRepository) {
        this.showingRepository = showingRepository;
    }

    // Register a new credit showing
    public void registerShowing(int duration, String showTime, 
                                Long showRoomId, int movieId) {
        Showing showing = new Showing();
        showing.setShowingId((int)showingRepository.maxShowingId() + 1);
        showing.setDuration(duration);
        showing.setShowTime(showTime);
        showing.setShowRoomId(showRoomId);
        showing.setShowingId(movieId);

        showingRepository.save(showing);
    }
}

