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
    private Long id; // Auto-generated ID
    
    @Column(name = "title")
    private String title; // Matches the database column
    
    @Column(name = "description")
    private String description; // Matches the database column
    
    @Column(name = "release_date")
    private String releaseDate; // Matches the database column (consider changing to Date type if appropriate)
    
    @Column(name = "genre")
    private String genre; // Matches the database column
    
    @Column(name = "trailer_url")
    private String trailerUrl; // Matches the database column
    
    @Column(name = "category")
    private String category; // Matches the database column
}


