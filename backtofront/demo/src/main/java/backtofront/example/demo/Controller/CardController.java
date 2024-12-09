package backtofront.example.demo.Controller;

import org.springframework.web.bind.annotation.*;
import backtofront.example.demo.Card.*;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class CardController {
    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }

    // returns cardId
    @PostMapping("/register-card")
    public int registerCard(@RequestBody Card card, @RequestParam int address_id) {
        return cardService.registerCard(
            card.getCardType(),
            card.getCardNumber(),
            card.getExpirationDate(),
            card.getSecurityCode(),
            address_id
        );
    }

    // returns cardId
    @PostMapping("/update-card")
    public int updateCard(@RequestBody Card card, @RequestParam int address_id, @RequestParam int card_id) {
        return cardService.updateCard(
            card.getCardType(),
            card.getCardNumber(),
            card.getExpirationDate(),
            card.getSecurityCode(),
            address_id,
            card_id
        );
    }
    
}