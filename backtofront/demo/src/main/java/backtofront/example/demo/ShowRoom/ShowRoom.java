package backtofront.example.demo.ShowRoom;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class ShowRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "showroom_id", unique = true, nullable = false)
    private int showRoomId;

    @Column(name = "num_seats", nullable = false)
    private int numSeats;
}