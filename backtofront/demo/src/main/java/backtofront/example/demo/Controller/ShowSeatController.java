package backtofront.example.demo.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backtofront.example.demo.Controller.ControllerMessage.*;
import backtofront.example.demo.ShowSeat.*;
import backtofront.example.demo.Showing.ShowingService;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class ShowSeatController {
    private final ShowSeatService showSeatService;
    private final ShowingService showingService;

    public ShowSeatController(ShowSeatService showSeatService, ShowingService showingService) {
        this.showSeatService = showSeatService;
        this.showingService = showingService;

    }

    @PostMapping("/update-seats")
    public ResponseEntity<?> updateSeats(@RequestParam int showingId, @RequestParam List<String> seatAvailability) {
        try {
            for (String seat : seatAvailability) 
                showSeatService.registerShowSeat(seat, showingService.findByShowingId(showingId).get().getShowingId());
            return ResponseEntity.ok(new OKMessage("Promo registered and sent successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ERRORMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }
    }

    @GetMapping("/get-seats")
    public List<ShowSeat> getSeats(@RequestParam int showingId) {
        return showSeatService.findByShowingId(showingId);
    }
}