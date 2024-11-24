package backtofront.example.demo.Card;

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
    @Query("update Card c set c.cardId = ?1, c.card_type = ?2, c.card_number = ?3, c.expirationDate = ?4, c.securityCode = ?5 where c.user.userId = ?6")
    void updateCard(int card_id, String card_type, String card_number, String expiration_date, String security_code, User user);
}