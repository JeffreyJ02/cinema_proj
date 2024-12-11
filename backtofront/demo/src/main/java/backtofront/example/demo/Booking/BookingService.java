package backtofront.example.demo.Booking;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public void registerBooking(String seats, String tickets, String movieTitle, String showDate,
                                String showTime, String cardNumber, double price, int userId) {
        Booking booking = new Booking();
        System.out.println("Repository");
        booking.setBookingId((int)bookingRepository.maxBookingId() + 1);
        booking.setSeats(seats);
        booking.setTickets(tickets);
        booking.setShowDate(showDate);
        booking.setShowTime(showTime);
        booking.setCardNumber(cardNumber);
        booking.setMovieTitle(movieTitle);
        booking.setPrice(price);
        booking.setUserId(userId);
        System.out.println("Repository2");
        System.out.println(booking);
        bookingRepository.save(booking);
        System.out.println("Repository3");
    }

    public List<Booking> getUserBookings(int userId) {
        return bookingRepository.findAllByUserId(userId);
    }
}
