package backtofront.example.demo.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backtofront.example.demo.Controller.ControllerMessage.*;
import backtofront.example.demo.Showing.*;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class ShowingController {
    private final ShowingService showingService;

    public ShowingController(ShowingService showingService) {
        this.showingService = showingService;
    }

    @PostMapping("/register-showing")
    public ResponseEntity<?> registerShowing(@RequestBody Showing showing) {
        try {
            if (!showingService.conflict(showing)) {
                showingService.registerShowing(
                    showing.getDuration(),
                    showing.getShowTime(),
                    showing.getShowroomId(),
                    showing.getMovieId(),
                    showing.getShowDate()
                );
                return ResponseEntity.ok(new OKMessage("Showing registered successfully."));
            }
            else return ResponseEntity.ok(new OKMessage("Scheduling conflict. Cannot register showing."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new OKMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }
    }

    @GetMapping("/get-showings-by-movie-id-and-show-date")
    public List<Showing> getShowingsByMovieIdAndShowDate(@RequestParam int movieId, @RequestParam String date) {
        return showingService.findByMovieIdAndShowDate(movieId, date);
    }

    // change 'showing' to 'showings'
    @GetMapping("/get-showing-by-movie-id")
    public List<Showing> getShowingsByMovieId(@RequestParam int movieId) {
        return showingService.findByMovieId(movieId);
    }

    @GetMapping("/get-movie-ids-by-showdate")
    public List<Integer> getMovieIdsByShowDate(@RequestParam String showDate) {
        return showingService.getMovieIdsByShowDate(showDate);
    }
}