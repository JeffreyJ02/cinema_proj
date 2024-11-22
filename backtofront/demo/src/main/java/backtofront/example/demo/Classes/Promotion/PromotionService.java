package backtofront.example.demo.Classes.Promotion;

import java.sql.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class PromotionService {

    private final PromotionRepository promotionRepository;

    public PromotionService(PromotionRepository promotionRepository) {
        this.promotionRepository = promotionRepository;
    }

    // Register a new promotion
    public void registerPromotion(boolean bogo, int discount_percentage, 
                                  String promoCode, Date expirationDate) {
        Promotion promotion = new Promotion();
        promotion.setPromoId(promotionRepository.maxPromoId() + 1);
        promotion.setBogo(bogo);
        promotion.setDiscountPercent(discount_percentage);
        promotion.setPromoCode(promoCode);
        promotion.setExpirationDate(expirationDate);
        promotionRepository.save(promotion);
    }

    public Optional<Promotion> findByPromoCode(String promoCode) {
        return promotionRepository.findByPromoCode(promoCode);
    }

}