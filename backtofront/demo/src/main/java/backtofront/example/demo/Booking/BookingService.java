package backtofront.example.demo.Booking;

import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public void registerBooking(int num_tickets, double total_price, int promotion_id, 
                                int user_id) {
        Booking booking = new Booking();
        booking.setBookingId((int)bookingRepository.maxBookingId() + 1);
        booking.setNumTickets(num_tickets);
        booking.setTotalPrice(user_id);
        booking.setPromotionId(promotion_id);
        booking.setUserId(user_id);

        bookingRepository.save(booking);
    }
}
