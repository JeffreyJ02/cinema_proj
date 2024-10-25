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

    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {

            if (user.getFirstName() == null || user.getFirstName().isEmpty() ||
            user.getLastName() == null || user.getLastName().isEmpty() ||
            user.getEmail() == null || user.getEmail().isEmpty() ||
            user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(new ErrorResponse("Missing required fields"));
        }
            userService.registerUser(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                user.getPhoneNumber(),
                user.isRegisterForPromotions(),
                user.getCreditCardNumber(),
                user.getExpirationDate(),
                user.getCvv(),
                user.getStreet(),
                user.getCity(),
                user.getState(),
                user.getZipCode()
            );
            return ResponseEntity.ok(new ResponseMessage("User registered successfully!"));
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


    @GetMapping("/user-profile")
    public ResponseEntity<Object> getUserProfile(@RequestParam String email) {
        try {
            User user = userService.getUserProfile(email);
            UserProfileResponse response = new UserProfileResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.isRegisterForPromotions(),
                user.getStreet(),
                user.getCity(),
                user.getState(),
                user.getZipCode()
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
    private Long phoneNumber;
    @SuppressWarnings("FieldMayBeFinal")
    private boolean registerForPromotions;
    @SuppressWarnings("FieldMayBeFinal")
    private String street;
    @SuppressWarnings("FieldMayBeFinal")
    private String city;
    @SuppressWarnings("FieldMayBeFinal")
    private String state;
    @SuppressWarnings("FieldMayBeFinal")
    private String zipCode;


    public UserProfileResponse(String firstName, String lastName, String email, Long phoneNumber, boolean registerForPromotions, String street, String city, String state, String zipCode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.registerForPromotions = registerForPromotions;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
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

        @SuppressWarnings("unused")
        public String getStreet() {
            return street;
        }

        @SuppressWarnings("unused")
        public void setStreet(String street) {
            this.street = street;
        }

        @SuppressWarnings("unused")
        public String getCity() {
            return city;
        }

        @SuppressWarnings("unused")
        public void setCity(String city) {
            this.city = city;
        }

        @SuppressWarnings("unused")
        public String getState() {
            return state;
        }

        @SuppressWarnings("unused")
        public void setState(String state) {
            this.state = state;
        }

        @SuppressWarnings("unused")
        public String getZipCode() {
            return zipCode;
        }

        @SuppressWarnings("unused")
        public void setZipCode(String zipCode) {
            this.zipCode = zipCode;
        }
    }


// Update user profile
@PostMapping("/update-profile")
public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest updateProfileRequest) {
    System.out.println("Received update profile request: " + updateProfileRequest);
    try {
        userService.updateProfile(
            updateProfileRequest.getEmail(),
            updateProfileRequest.getFirstName(),
            updateProfileRequest.getLastName(),
            updateProfileRequest.getPhoneNumber(),
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
    System.out.println("Received update profile request: " + updatePasswordRequest);
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
    private String email;
    private String firstName;
    private String lastName;
    private Long phoneNumber;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private boolean registerForPromotions;

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public boolean isRegisterForPromotions() {
        return registerForPromotions;
    }

    public void setRegisterForPromotions(boolean registerForPromotions) {
        this.registerForPromotions = registerForPromotions;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    }

private static class UpdatePasswordRequest {
    private String email;
    private String currentPassword;
    private String newPassword;

    // Getters and Setters
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}



}
