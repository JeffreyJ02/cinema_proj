package backtofront.example.demo.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    List<User> findByRegisterForPromotions(boolean registerForPromotions);
    Optional<User> findByFirstNameAndLastName(String firstName, String lastName);
    void deleteByEmail(String email);

}
