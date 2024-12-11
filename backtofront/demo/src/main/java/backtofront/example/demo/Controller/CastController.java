package backtofront.example.demo.Controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import backtofront.example.demo.Cast.*;
import backtofront.example.demo.Controller.ControllerMessage.ERRORMessage;
import backtofront.example.demo.Controller.ControllerMessage.OKMessage;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class CastController {
    private final CastService castService;

    public CastController(CastService castService) {
        this.castService = castService;
    }

    @GetMapping("/get-cast")
    public List<Cast> getCast(@RequestParam int movie_id) {
        return castService.findAllByMovieId(movie_id);
    }


    @PostMapping("/register-cast")
    public ResponseEntity<?> registercast(@RequestBody Cast cast) {
        try {
            castService.registerCast(
            cast.getActor(),
            cast.getRole(),
            cast.getMovieId()
        );
            return ResponseEntity.ok(new OKMessage("Address registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ERRORMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }   
    }

   /*@PostMapping("/update-cast")
    public ResponseEntity<?> updatecast(@RequestBody Cast cast, @RequestParam int cast_id) {
        try {
            castService.updatecast(
            cast.getcastType(),
            cast.getcastNumber(),
            cast.getExpirationDate(),
            cast.getSecurityCode(),
            cast_id
        );
            return ResponseEntity.ok(new OKMessage("Address registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ERRORMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }   
    } */
    
   /* @GetMapping("/get-user-casts")
    public List<cast> getUsercasts(@RequestParam int user_id) {
        return castService.getUsercasts(user_id);
    }

    @GetMapping("/get-user-billing-address-ids")
    public List<Integer> getUserBillingAddressIds(@RequestParam int user_id) {
        return castService.getUserBillingAddressIds(user_id);
    } */
}