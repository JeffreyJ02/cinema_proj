package backtofront.example.demo;

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
    @Column(name = "id")
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

}


