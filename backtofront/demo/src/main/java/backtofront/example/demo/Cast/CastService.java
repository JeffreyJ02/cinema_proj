package backtofront.example.demo.Cast;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class CastService {

    private final CastRepository castRepository;

    public CastService(CastRepository castRepository) {
        this.castRepository = castRepository;
    }

    // Register a new credit cast
    public void registerCast(String actor, String role, int movie_id) {
        Cast cast = new Cast();
        //cast.setActorId((int)castRepository.maxActorId() + 1);
        cast.setActor(actor);
        cast.setRole(role);
        cast.setMovieId(movie_id);

        castRepository.save(cast);
    }

    public List<Cast> findAllByMovieId(int movie_id) {
        return castRepository.findAllByMovieId(movie_id);
    }
}
