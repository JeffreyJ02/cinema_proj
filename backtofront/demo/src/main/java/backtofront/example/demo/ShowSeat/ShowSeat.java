package backtofront.example.demo.ShowSeat;

import backtofront.example.demo.Showing.Showing;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "showing_id", referencedColumnName = "showing_id")
    private Showing showing;
} 
