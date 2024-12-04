package backtofront.example.demo.Promotion;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    Optional<Promotion> findByPromoCode(String promoCode);
    List<Promotion> findAll();
    
    @Query("select max(p.promoId) from Promotion p")
    int maxPromoId();    
}