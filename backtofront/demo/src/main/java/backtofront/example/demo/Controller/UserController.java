package backtofront.example.demo.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backtofront.example.demo.Controller.ControllerMessage.*;
import backtofront.example.demo.User.*;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhone_number(),
                user.getPassword(),
                user.getPromotions()
            );
            return ResponseEntity.ok(new OKMessage("User registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ERRORMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }
    }

    @PostMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody User user) {
        try {
            userService.updateProfile(
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhone_number(),
                user.getPromotions()
            );
            return ResponseEntity.ok(new OKMessage("Profile updated successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ERRORMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }
    }

    @PostMapping("/login-user")
    public ResponseEntity<Object> loginUser(@RequestBody User user) {
        Optional<User> existingUser = userService.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            System.out.println("Recieved password: " + user.getPassword());
            System.out.println("User password: " + existingUser.get().getPassword());
            if (existingUser.get().getPassword().equals(user.getPassword())) {
                return ResponseEntity.ok(new OKMessage("Login successful: " + existingUser.get().getEmail()));
            } 
            else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ERRORMessage("Incorrect password"));
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ERRORMessage("User not found"));
    }

    // change to 'get-user-by-email'
    @GetMapping("/user-profile")
    public User getUserProfile(@RequestParam String email) {
        return userService.findByEmail(email).get();
    }

    @GetMapping("/get-all-users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/get-emails-for-promo")
    public List<String> getEmailsForPromos() {
        return userService.getEmailsForPromo();
    }

    @GetMapping("/get-user-admin-status")
    public int getAdminStatus(@RequestParam String email) {
        return userService.getUserProfile(email).getAdmin();
    }
}