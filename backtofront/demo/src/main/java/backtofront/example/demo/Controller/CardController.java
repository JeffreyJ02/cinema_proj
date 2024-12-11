package backtofront.example.demo.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import backtofront.example.demo.Card.*;
import backtofront.example.demo.Controller.ControllerMessage.ERRORMessage;
import backtofront.example.demo.Controller.ControllerMessage.OKMessage;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class CardController {
    private final CardService cardService;

    public CardController(CardService cardService) {
        this.cardService = cardService;
    }


    @PostMapping("/register-card")
    public ResponseEntity<?> registerCard(@RequestBody Card card, @RequestParam int user_id, @RequestParam int address_id) {
        try {
            cardService.registerCard(
            card.getCardType(),
            card.getCardNumber(),
            card.getExpirationDate(),
            card.getSecurityCode(),
            user_id,
            address_id
        );
            return ResponseEntity.ok(new OKMessage("Address registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ERRORMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }   
    }

    @PostMapping("/update-card")
    public ResponseEntity<?> updateCard(@RequestBody Card card, @RequestParam int card_id) {
        try {
            cardService.updateCard(
            card.getCardType(),
            card.getCardNumber(),
            card.getExpirationDate(),
            card.getSecurityCode(),
            card_id
        );
            return ResponseEntity.ok(new OKMessage("Address registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ERRORMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }   
    }
    
    @GetMapping("/get-user-cards")
    public List<Card> getUserCards(@RequestParam int user_id) {
        return cardService.getUserCards(user_id);
    }

    @GetMapping("/get-user-billing-address-ids")
    public List<Integer> getUserBillingAddressIds(@RequestParam int user_id) {
        return cardService.getUserBillingAddressIds(user_id);
    }
}