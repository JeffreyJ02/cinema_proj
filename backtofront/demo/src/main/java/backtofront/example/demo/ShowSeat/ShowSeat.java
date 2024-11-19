package backtofront.example.demo.ShowSeat;

import backtofront.example.demo.Showing.Showing;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class ShowSeat {
    
    @Column(name = "seat_id", unique=true)
    private String seatId; 
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "showing_id", referencedColumnName = "showing_id")
    private Showing showing;
} 
