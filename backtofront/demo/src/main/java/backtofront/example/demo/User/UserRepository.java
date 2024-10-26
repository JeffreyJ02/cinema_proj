package backtofront.example.demo.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUserId(Long id); 

    @Modifying  
    @Query("update User u set u.password = ?1, u.registerForPromos = ?2 where u.userId = ?3")
    void editUserById(String password, int registerForPromos, int user_id); 

    @Modifying
    @Query("update User u set u.password = ?1, u.userId = ?2")
    void tempPassUpdate(String password, int user_id);

    boolean existsByEmail(String email);

    // for valid login
    Optional<User> findByEmailAndPassword(String email, String password);

    // query?
    List<User> findByRegisterForPromos(int registerForPromos);

    Optional<User> findByFirstNameAndLastName(String firstName, String lastName);
    
    void deleteByEmail(String email);
}