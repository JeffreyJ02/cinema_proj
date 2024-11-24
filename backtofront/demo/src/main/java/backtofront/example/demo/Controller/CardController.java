package backtofront.example.demo.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    // same deal with email, why use email?
    /* @PostMapping("/register-card")
    public ResponseEntity<?> registerCard(@RequestBody RegisterCardRequest cardRequest) {
        try {
            cardService.registerCard(
                    cardRequest.getCard_type(),
                    cardRequest.getCard_number(),
                    cardRequest.getExpirationDate(),
                    cardRequest.getSecurityCode(),
                    cardRequest.getEmail());
            return ResponseEntity.ok(new ResponseMessage("Card registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
        }
    } */
}