package backtofront.example.demo.Card;

import java.util.List;
//import java.util.Optional;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {
    List<Card> findAll();
    List<Card> findAllByUserId(int user_id);
    Optional<Card> findByCardId(int card_id);

    @Query("select max(c.cardId) from Card c")
    int maxCardId();
    
    @Modifying
    @Query("update Card c set c.cardType = ?1, c.cardNumber = ?2, c.expirationDate = ?3, c.securityCode = ?4 where c.cardId = ?5")
    void updateCard(String card_type, String card_number, String expiration_date, String security_code, int card_id);
}