package backtofront.example.demo.Showing;

import java.sql.Date;
import java.sqo.Time;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Showing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "showing_id", unique = true, nullable = false)
    private int showingId;

    @Column(name = "duration", nullable = false)
    private int duration;

    @Column(name = "show_time", nullable = false)
    private String showTime;

    // rework ids based on working user/card/address interactions
    // showroom int 1,2, or 3?
    // movie String name, findByMovieName when info is needed?

    @Column(name = "showroom_id", nullable = false)
    private int showroomId;

    @Column(name = "movie_id", nullable = false)
    private int movieId;

    @Column(name = "show_date", nullable = false)
    private Date showDate;
}