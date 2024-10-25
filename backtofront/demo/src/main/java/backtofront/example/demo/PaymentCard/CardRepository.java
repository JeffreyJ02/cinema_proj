package backtofront.example.demo.PaymentCard;

import java.util.List;
//import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backtofront.example.demo.User.User;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {
    @SuppressWarnings("null")
    @Override
    List<Card> findAll();
    List<Card> findAllByUser(User user); 

    @Modifying
    @Query("update Card c set c.id = ?1, c.type = ?2, c.number = ?3, c.expirationDate = ?4, c.securityCode = ?5 where c.user = ?6")
    void updateAddress(int card_id, String card_type, String card_number, String expiration_date, String security_code, User user);
}