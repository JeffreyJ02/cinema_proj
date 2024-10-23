package backtofront.example.demo.PaymentCard;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findAll();
    Optional<Card> findByCardId(int id); 

    @Modifying
    @Query("update Card c set c.card_id = ?1, c.card_type = ?2, c.card_number = ?3, c.expiration_date = ?4, c.security_code = ?5, where c.user_id = ?6")
    void updateAddress(int card_id, String card_type, String card_number, String expiration_date, String security_code, int user_id);
}