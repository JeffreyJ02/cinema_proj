package backtofront.example.demo.Classes.ShowSeat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class ShowSeat {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "show_seat_id", unique = true, nullable = false)
    private int showSeatId;

    @Column(name = "seat_id")
    private String seatId; 

    @Column(name = "showing_id")
    private int showingId;
} 
