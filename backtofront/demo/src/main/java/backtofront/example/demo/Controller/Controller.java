package backtofront.example.demo.Controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backtofront.example.demo.Address.Address;
import backtofront.example.demo.Address.AddressService;
import backtofront.example.demo.PaymentCard.Card;
import backtofront.example.demo.PaymentCard.CardService;
import backtofront.example.demo.User.User;
import backtofront.example.demo.User.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class Controller {

    private final UserService userService;
    private final CardService cardService;
    private final AddressService addressService;

    public Controller(UserService userService, CardService cardService, AddressService addressService) {
        this.userService = userService;
        this.cardService = cardService;
        this.addressService = addressService;
    }

    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                user.isRegisterForPromotions() // Get the boolean value
, 0
            );
            return ResponseEntity.ok(new ResponseMessage("User registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    @PostMapping("/register-address") 
    public ResponseEntity<?> registerAddress(@RequestBody Address address) {
        try {
            addressService.registerAddress(
                address.getStreet_info(),
                address.getCity(),
                address.getState(),
                address.getZip_code(),
                address.getUser_id()
            );
            return ResponseEntity.ok(new ResponseMessage("Address registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    @PostMapping("/register-card")
    public ResponseEntity<?> registerCard(@RequestBody Card card) {
        try {
            cardService.registerCard(
                card.getCard_type(),
                card.getCard_number(),
                card.getExpiration_date(),
                card.getSecurity_code(),
                card.getAddress_id(),
                card.getUser_id()
            );
            return ResponseEntity.ok(new ResponseMessage("Card registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
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

    // edit this
    @GetMapping("/user-profile")
    public ResponseEntity<Object> getUserProfile(@RequestParam String email) {
        try {
            User user = userService.getUserProfile(email);
            UserProfileResponse response = new UserProfileResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                user.isRegisterForPromotions(),
                user.getHome_address_id()
            );
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    // Response classes
    private static class LoginResponse {
        @SuppressWarnings("FieldMayBeFinal")
        private String message;
        @SuppressWarnings("FieldMayBeFinal")
        private String email;

        public LoginResponse(String message, String email) {
            this.message = message;
            this.email = email;
        }

        @SuppressWarnings("unused")
        public String getMessage() {
            return message;
        }

        @SuppressWarnings("unused")
        public String getEmail() {
            return email;
        }
    }

    private static class ErrorResponse {
        @SuppressWarnings("FieldMayBeFinal")
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        @SuppressWarnings("unused")
        public String getError() {
            return error;
        }
    }


    // ResponseMessage class
private static class ResponseMessage {
    @SuppressWarnings("FieldMayBeFinal")
    private String message;

    public ResponseMessage(String message) {
        this.message = message;
    }

    @SuppressWarnings("unused")
    public String getMessage() {
        return message;
    }
}


// User profile response class
private static class UserProfileResponse {
    @SuppressWarnings("FieldMayBeFinal")
    private String firstName;
    @SuppressWarnings("FieldMayBeFinal")
    private String lastName;
    @SuppressWarnings("FieldMayBeFinal")
    private String email;
    @SuppressWarnings("FieldMayBeFinal")
    private String password;
    @SuppressWarnings("FieldMayBeFinal")
    private boolean registerForPromotions;
    @SuppressWarnings("FieldMayBeFinal")
    private int home_address_id;

    public UserProfileResponse(String firstName, String lastName, String email,String password, boolean registerForPromotions, int home_address_id ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.registerForPromotions = registerForPromotions;
        this.home_address_id = home_address_id;

    }

    @SuppressWarnings("unused")
    public String getFirstName() {
        return firstName;
    }

    @SuppressWarnings("unused")
    public String getLastName() {
        return lastName;
    }

    @SuppressWarnings("unused")
    public String getEmail() {
        return email;
    }

    @SuppressWarnings("unused")
    public String getPassword(){
        return password;
    }

    @SuppressWarnings("unused")
    public boolean isRegisterForPromotions() {
        return registerForPromotions;
    }

    @SuppressWarnings("unused")
    public int getHome_address_id(){
        return home_address_id;
    }
    }

    


// Update user profile
/*
@PostMapping("/update-profile")
public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest updateProfileRequest) {
    try {
        userService.updateProfile(
            updateProfileRequest.getEmail(),
            updateProfileRequest.getFirstName(),
            updateProfileRequest.getLastName(),
            updateProfileRequest.getStreet(),
            updateProfileRequest.getCity(),
            updateProfileRequest.getState(),
            updateProfileRequest.getZipCode(),
            updateProfileRequest.isRegisterForPromotions()
        );
        return ResponseEntity.ok(new ResponseMessage("Profile updated successfully!"));
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
    }
}

// Update user password
@PostMapping("/update-password")
public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
    try {
        userService.updatePassword(
            updatePasswordRequest.getEmail(),
            updatePasswordRequest.getCurrentPassword(),
            updatePasswordRequest.getNewPassword()
        );
        return ResponseEntity.ok(new ResponseMessage("Password updated successfully!"));
    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
    }
}

// Request classes for profile and password updates
private static class UpdateProfileRequest {
    private int id;
    private String email;
    private String firstName;
    private String lastName;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private boolean registerForPromotions;

    // Getters and Setters
    /* public int setid(int id) {
        this.id = id;
    } */
}