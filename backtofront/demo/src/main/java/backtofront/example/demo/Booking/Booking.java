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
    @Column(name = "booking_id", unique = true, nullable = false)
    private int bookingId;

    @Column(name = "seats", nullable = false)
    private String seats;

    @Column(name = "tickets", nullable = false)
    private String tickets;

    @Column(name = "movie_title", nullable = false)
    private String movieTitle;

    @Column(name = "show_date", nullable = false)
    private String showDate;

    @Column(name = "show_time", nullable = false)
    private String showTime;

    @Column(name = "card_number", nullable = false)
    private String cardNumber;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "user_id", nullable = false)
    private int userId;
    
}