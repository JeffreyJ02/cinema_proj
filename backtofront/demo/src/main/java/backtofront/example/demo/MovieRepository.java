package backtofront.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    
    List<Movie> findByTitleContaining(String title);
}
