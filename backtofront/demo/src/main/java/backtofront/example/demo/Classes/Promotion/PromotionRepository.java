package backtofront.example.demo.Classes.Promotion;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    Optional<Promotion> findByPromoCode(String promoCode);

    @Query("select max(p.promoId) from Promotion p")
    int maxPromoId();    
}