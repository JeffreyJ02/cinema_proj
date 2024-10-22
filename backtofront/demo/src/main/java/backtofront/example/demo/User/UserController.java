package backtofront.example.demo.User;

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

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                user.isRegisterForPromotions(), // Get the boolean value
                user.getCreditCardNumber(), // Optional field
                user.getExpirationDate(), // Optional field
                user.getCvv() // Optional field
            );
            return ResponseEntity.ok(new ResponseMessage("User registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }
    
    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("token") String token) {
        boolean isVerified = userService.verifyUser(token);
        if (isVerified) {
            return ResponseEntity.ok("Email verified successfully. You can now log in.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token.");
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


    @GetMapping("/user")
    public ResponseEntity<Object> getUserProfile(@RequestParam String email) {
        User user = userService.findByEmail(email).orElse(null);
        if (user != null) {
            // Include the registerForPromotions field in the response
            return ResponseEntity.ok(new UserProfileResponse(user.getFirstName(), user.getLastName(), user.getEmail(), user.isRegisterForPromotions()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("User not found"));
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
// User profile response class
private static class UserProfileResponse {
    @SuppressWarnings("FieldMayBeFinal")
    private String firstName;
    @SuppressWarnings("FieldMayBeFinal")
    private String lastName;
    @SuppressWarnings("FieldMayBeFinal")
    private String email;
    @SuppressWarnings("FieldMayBeFinal")
    private boolean registerForPromotions; // Include this field

    public UserProfileResponse(String firstName, String lastName, String email, boolean registerForPromotions) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.registerForPromotions = registerForPromotions;
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
    public boolean isRegisterForPromotions() {
        return registerForPromotions;
    }
}

}
