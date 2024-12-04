package backtofront.example.demo.Controller;

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
    public ResponseEntity<?> registerCard(@RequestBody Card card, @RequestParam int address_id) {
        try {
            cardService.registerCard(
                    card.getCard_type(),
                    card.getCard_number(),
                    card.getExpirationDate(),
                    card.getSecurityCode(),
                    address_id
            );
            return ResponseEntity.ok(new OKMessage("Card registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ERRORMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }
    }
}