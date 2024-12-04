package backtofront.example.demo.Cast;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CastRepository extends JpaRepository<Cast, Integer> {

    List<Cast> findAllByMovieId(int movie_id); 

    @Query("select max(c.actorId) from Cast c")
    int maxActorId();
}