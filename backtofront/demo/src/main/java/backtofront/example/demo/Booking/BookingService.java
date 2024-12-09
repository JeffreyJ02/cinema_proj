package backtofront.example.demo.Booking;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public void registerBooking(List<Integer> tickets, String movieTitle, String showDate,
                               String showTime, String cardNumber, int userId) {
        Booking booking = new Booking();
        // (int)
        booking.setBookingId(bookingRepository.maxBookingId() + 1);
        booking.setTickets(tickets);
        booking.setShowDate(showDate);
        booking.setShowTime(showTime);
        booking.setCardNumber(cardNumber);
        booking.setUserId(userId);

        bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(int userId) {
        return bookingRepository.findAllByUserId(userId);
    }
}
