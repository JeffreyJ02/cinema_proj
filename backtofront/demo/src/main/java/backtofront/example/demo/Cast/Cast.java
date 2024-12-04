package backtofront.example.demo.Cast;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Cast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "actor_id", unique = true)
    private int actorId;

    @Column(name = "actor", nullable = false)
    private String actor;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "movie_id", nullable = false)
    private int movieId;
} 