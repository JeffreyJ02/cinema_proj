package backtofront.example.demo.Showing;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

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
        showing.setShowingId(showingRepository.maxShowingId() + 1);
        showing.setDuration(duration);
        showing.setShowTime(showTime);
        showing.setShowroomId(showRoomId);
        showing.setMovieId(movieId);
        showing.setShowDate(showDate);

        showingRepository.save(showing);
    }

    public List<Showing> findByMovieIdAndShowDate(int movieId, String showDate) {
        return showingRepository.findByMovieIdAndShowDate(movieId, showDate);
    }

    public List<Showing> findByMovieId(int movieId) {
        return showingRepository.findByMovieId(movieId);
    }

    public List<Integer> getMovieIdsByShowDate(String showDate) {
        List<Integer> movie_ids = new ArrayList<>(); 
        for (Showing showing : showingRepository.findByShowDate(showDate))
            movie_ids.add(showing.getMovieId());
        return movie_ids;
    }

    public Optional<Showing> findByShowingId(int id) {
        return showingRepository.findByShowingId(id);
    }

    public boolean conflict(Showing showing) {
        List<Showing> other_showings = showingRepository.findByShowDateAndShowroomId(showing.getShowDate(), showing.getShowroomId());
        
        String showTime = showing.getShowTime();
        int show_start  = Integer.parseInt(showTime.substring(0, 2)) * 60 + Integer.parseInt(showTime.substring(3));   
        int show_end    = show_start + showing.getDuration();

        for (Showing other_showing : other_showings) {
            String other_showTime = other_showing.getShowTime();
            int other_show_start  = Integer.parseInt(other_showTime.substring(0, 2)) * 60 + Integer.parseInt(other_showTime.substring(3));   
            int other_show_end    = other_show_start + other_showing.getDuration();

            if (show_start >= other_show_start && show_start <= other_show_end) return true;
            if (show_end >= other_show_start && show_end <= other_show_end) return true;
        }
        return false;
    } 

}