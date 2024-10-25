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
    Optional<User> findById(Long id); 

    @Modifying  
    @Query("update User u set u.password = ?1, u.resigster_for_promotions = ?2 where u.id = ?3")
    void editUserById(String password, boolean register_for_promos, Long id); 

    @Modifying
    @Query("update User u set u.card_type1 = ?1, u.credit_card_number1 = ?2, u.expiration_date1 = ?3, u.cvv1 = ?4 where u.id = ?5")
    void updateCard1(String card_type, String card_number, String expiration_date, String cvv, Long id);

    @Modifying
    @Query("update User u set u.card_type2 = ?1, u.credit_card_number2 = ?2, u.expiration_date2 = ?3, u.cvv2 = ?4 where u.id = ?5")
    void updateCard2(String card_type, String card_number, String expiration_date, String cvv, Long id);

    @Modifying
    @Query("update User u set u.card_type3 = ?1, u.credit_card_number3 = ?2, u.expiration_date3 = ?3, u.cvv3 = ?4 where u.id = ?5")
    void updateCard3(String card_type, String card_number, String expiration_date, String cvv, Long id);

    @Modifying
    @Query("update User u set u.street = ?1, u.city = ?2, u.state = ?3, u.zipCode = ?4 where u.id = ?5")
    void updateAddress(String street, String city, String state, String zip);

    boolean existsByEmail(String email);
    List<User> findByRegisterForPromos(boolean registerForPromos);
    Optional<User> findByFirstNameAndLastName(String firstName, String lastName);
    void deleteByEmail(String email);

}
