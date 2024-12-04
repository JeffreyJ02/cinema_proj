package backtofront.example.demo.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findAllByUserId(int user_id); 

    @Query("select max(b.bookingId) from Booking b")
    int maxBookingId();
}