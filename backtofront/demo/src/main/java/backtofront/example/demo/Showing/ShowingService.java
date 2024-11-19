package backtofront.example.demo.Showing;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import backtofront.example.demo.Movie.Movie;
import backtofront.example.demo.ShowRoom.ShowRoom;

@Service
public class ShowingService {

    private final ShowingRepository showingRepository;

    public ShowingService(ShowingRepository showingRepository) {
        this.showingRepository = showingRepository;
    }

    // Register a new showing
    public void registerShowing(int duration, String showTime, 
                                ShowRoom showRoomId, Movie movie, Date showDate) {
        Showing showing = new Showing();
        showing.setShowingId((int)showingRepository.maxShowingId() + 1);
        showing.setDuration(duration);
        showing.setShowTime(showTime);
        showing.setShowDate(showDate);

        showingRepository.save(showing);
    }

    public List<Showing> findByMovieIdAndShowDate(Movie movie, Date showDate) {
        return showingRepository.findByMovieIdAndShowDate(movie, showDate);
    }

    public List<Showing> findByMovieId(Movie movie) {
        return showingRepository.findByMovieId(movie);
    }

    public Optional<Showing> findById(int id) {
        return showingRepository.findById(id);
    }

    boolean conflict(String showTime, int showRoomId) {
        return showingRepository.findByShowTimeAndShowRoomId(showTime, showRoomId).isPresent();
    } 

}