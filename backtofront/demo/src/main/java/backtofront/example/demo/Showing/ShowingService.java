package backtofront.example.demo.Showing;

/* import java.sql.Date;
import java.sql.Time; */
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import backtofront.example.demo.Movie.Movie;

@Service
public class ShowingService {

    private final ShowingRepository showingRepository;

    public ShowingService(ShowingRepository showingRepository) {
        this.showingRepository = showingRepository;
    }

    // Register a new showing
    public void registerShowing(int duration, String showTime, 
                                int showRoomId, int movieId, String showDate) {
        Showing showing = new Showing();
        showing.setShowingId((int)showingRepository.maxShowingId() + 1);
        showing.setDuration(duration);
        showing.setShowTime(showTime);
        showing.setShowroomId(showRoomId);
        showing.setMovieId(movieId);
        showing.setShowDate(showDate);

        showingRepository.save(showing);
    }

    public List<Showing> findByMovieIdAndShowDate(Movie movie, String showDate) {
        return showingRepository.findByMovieIdAndShowDate(movie, showDate);
    }

    public List<Showing> findByMovieId(Movie movie) {
        return showingRepository.findByMovieId(movie);
    }

    public Optional<Showing> findById(int id) {
        return showingRepository.findById(id);
    }

    public boolean conflict(String showTime, int showroomId) {
        return showingRepository.findByShowTimeAndShowroomId(showTime, showroomId).isPresent();
    } 

}