package backtofront.example.demo.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backtofront.example.demo.Controller.ControllerMessage.*;
import backtofront.example.demo.Promotion.*;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class PromotionController {
    private final PromotionService promotionService;

    public PromotionController(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @PostMapping("/register-promo")
    public ResponseEntity<?> addPromo(@RequestBody Promotion promotion) {
        try {
            promotionService.registerPromotion(
                promotion.isBogo(),
                promotion.getDiscountPercent(),
                promotion.getPromoCode(),
                promotion.getExpirationDate()
            );
            return ResponseEntity.ok(new OKMessage("Promo registered and sent successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ERRORMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }
    }

    @GetMapping("/get-promos")
    public List<Promotion> getPromos() {
        return promotionService.getPromos();
    }
}