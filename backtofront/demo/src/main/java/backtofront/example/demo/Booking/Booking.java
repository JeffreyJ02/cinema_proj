package backtofront.example.demo.Booking;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id", unique = true)
    private int bookingId;

    @Column(name = "num_tickets", nullable = false)
    private int numTickets;

    @Column(name = "total_price", nullable = false)
    private double totalPrice;

    @Column(name = "promotion_id", nullable = false)
    private int promotionId;

    @Column(name = "user_id", nullable = false)
    private int userId;

} 