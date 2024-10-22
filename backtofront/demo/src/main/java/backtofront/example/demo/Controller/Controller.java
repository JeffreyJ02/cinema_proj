package backtofront.example.demo.Controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backtofront.example.demo.User.*;
import backtofront.example.demo.CreditCard.*;
import backtofront.example.demo.Address.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class Controller {

    private final UserService userService;
    private final CreditCardService creditCardService;
    private final AddressService addressService;

    public Controller(UserService userService, CreditCardService creditCardService, AddressService addressService) {
        this.userService = userService;
        this.creditCardService = creditCardService;
        this.addressService = addressService;
    }

    // User Registration Endpoint
    @PostMapping("/register-user")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // Register the user 
        userService.registerUser(user.getFirst_name(), user.getLast_name(), user.getPhone_number(), user.getEmail(), 
                                 user.getPassword());
        return ResponseEntity.ok("User registered successfully!");
    }

    // Card Registration Endpoint
    // card =  1 2 or 3 based on which card edited
    @PostMapping("/register-card")
    public ResponseEntity<String> registerCard(@RequestBody CreditCard credit_card, Long id, int card) {
        creditCardService.registerCreditCard(id, card, credit_card.getCreditCardType(), credit_card.getCreditCardNumber(), 
                                             credit_card.getCreditCardExpirationDate(), credit_card.getCreditCardCcv(), credit_card.getBilling_address());
        return ResponseEntity.ok("Card " + card + " registered successfully!");
    }

    @PostMapping("/register-address")
    public ResponseEntity<String> registerAddress(@RequestBody Address address, Long id, int card) {
        addressService.registerUserAddress(id, address.getStreet_info(), address.getCity(), address.getState(), address.getZip_code());
        return ResponseEntity.ok("Address registered successfully!");
    }

    // User Login Endpoint
    @PostMapping("/login-user")
    public ResponseEntity<Object> loginUser(@RequestBody User user) {
        // Check if the user exists
        Optional<User> existingUser = userService.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            // Verify the password
            if (existingUser.get().getPassword().equals(user.getPassword())) {
                // Login successful, return a JSON object
                return ResponseEntity.ok(new LoginResponse("Login successful", existingUser.get().getEmail()));
            } else {
                // Password mismatch
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Incorrect password"));
            }
        } else {
            // User not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("User not found"));
        }
    }

    // Response classes
    private static class LoginResponse {
        private String message;
        private String email;

        public LoginResponse(String message, String email) {
            this.message = message;
            this.email = email;
        }
    }

    private static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }
    }
}
