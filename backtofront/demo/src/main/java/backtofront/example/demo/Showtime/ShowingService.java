package backtofront.example.demo.Showtime;

import org.springframework.stereotype.Service;

@Service
public class ShowingService {

    private final ShowingRepository showingRepository;

    public ShowingService(ShowingRepository showingRepository) {
        this.showingRepository = showingRepository;
    }

    public Showing addShowing(Showing showing) {
        return showingRepository.save(showing);
    }
}