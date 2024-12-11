package backtofront.example.demo.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import backtofront.example.demo.Booking.*;
import backtofront.example.demo.Controller.ControllerMessage.ERRORMessage;
import backtofront.example.demo.Controller.ControllerMessage.OKMessage;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/register-booking")
    public ResponseEntity<?> registerBooking(@RequestBody Booking booking, @RequestParam int user_id) {
        try {
            bookingService.registerBooking(
                booking.getSeats(),
                booking.getTickets(),
                booking.getMovieTitle(),
                booking.getShowDate(),
                booking.getShowTime(),
                booking.getCardNumber(),
                booking.getPrice(),
                user_id
            );
            return ResponseEntity.ok(new OKMessage("Booking registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ERRORMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }
    }

    @GetMapping("/get-user-bookings") 
    public List<Booking> getUserBookings(@RequestParam int userId) {
        return bookingService.getUserBookings(userId);
    }
    
}