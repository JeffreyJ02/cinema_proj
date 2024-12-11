package backtofront.example.demo.User;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUserId(int id); 
    List<User> findByPromotions(int promotions);
    List<User> findAll();

    @Transactional
    @Modifying  
    @Query("update User u set u.firstName = ?1, u.lastName = ?2, u.phone_number = ?3, u.promotions = ?4 where u.userId = ?5")
    void updateUserById(String firstName, String lastName, String phone_number, int promotions, int user_id); 

    @Query("select max(u.userId) from User u")
    int maxUserId();


    @Query("select u.userId from User u where u.email = ?1")
    int getUserIdByEmail(String email);

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?1 where u.email = ?2")
    void updatePassword(String password, String email);


    @Modifying
    @Query("update User u set u.password = ?1, u.userId = ?2")
    void tempPassUpdate(String password, int user_id);

    @Modifying
    @Query("update User u set u.password = ?1, u.userId = ?2")
    void updatePassword(String password, int user_id);


    boolean existsByEmail(String email);

    // for valid login
    Optional<User> findByEmailAndPassword(String email, String password);

    Optional<User> findByFirstNameAndLastName(String firstName, String lastName);
    
    void deleteByEmail(String email);
    
    void deleteByUserId(int user_id);
}