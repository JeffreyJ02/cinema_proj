package backtofront.example.demo.Movie;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Movie {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "movie_id")
    private Long id; 
    
    @Column(name = "title")
    private String title; 
    
    @Column(name = "description")
    private String description; 
    
    @Column(name = "release_date")
    private String releaseDate; 
    
    @Column(name = "genre")
    private String genre; 
    
    @Column(name = "trailer_url")
    private String trailerUrl; 
    
    @Column(name = "category")
    private String category; 

    @Column(name = "image_url")
    private String imageUrl; // Add this field to hold the movie image URL

    @Column(name = "age_rating")
    private String ageRating;

    @Column(name = "director")
    private String director;

    @Column(name = "producer")
    private String producer;

}


