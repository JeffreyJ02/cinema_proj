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
        booking.setBookingId((int)bookingRepository.maxBookingId() + 1);
        booking.setSeats(seats);
        booking.setTickets(tickets);
        booking.setShowDate(showDate);
        booking.setShowTime(showTime);
        booking.setCardNumber(cardNumber);
        booking.setPrice(price);
        booking.setUserId(userId);

        bookingRepository.save(booking);
    }

    public List<Booking> getUserBookings(int userId) {
        return bookingRepository.findAllByUserId(userId);
    }
}
