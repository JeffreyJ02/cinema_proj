package backtofront.example.demo.User;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

// Updated registerUser method to include optional credit card fields
public void registerUser(String firstName, String lastName, String email, String password, boolean registerForPromotions, String creditCardNumber, String expirationDate, String cvv) {
    if (userRepository.existsByEmail(email)) {
        throw new IllegalArgumentException("Email already exists");
    }
    User newUser = new User();
    newUser.setFirstName(firstName);
    newUser.setLastName(lastName);
    newUser.setEmail(email);
    newUser.setPassword(password);
    newUser.setRegisterForPromotions(registerForPromotions);
    newUser.setStatus("Inactive"); // User is inactive until email is verified

    // Generate a verification token
        String token = UUID.randomUUID().toString();
        newUser.setVerificationToken(token);

        userRepository.save(newUser);

        // Send verification email
        String verificationLink = "http://localhost:8080/api/verify?token=" + token;
        emailService.sendVerificationEmail(email, verificationLink);

    // Set the credit card information only if provided
    if (creditCardNumber != null && !creditCardNumber.isEmpty()) {
        newUser.setCreditCardNumber(creditCardNumber);
    }
    if (expirationDate != null && !expirationDate.isEmpty()) {
        newUser.setExpirationDate(expirationDate);
    }
    if (cvv != null && !cvv.isEmpty()) {
        newUser.setCvv(cvv);
    }

    userRepository.save(newUser);
}

    

    // Find a user by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Update user information
    public void updateUser(User user) {
        if (user == null || user.getEmail() == null) {
            throw new IllegalArgumentException("User or email cannot be null");
        }
        
        Optional<User> existingUserOpt = userRepository.findByEmail(user.getEmail());
        
        if (existingUserOpt.isPresent()) {
            User existingUser = existingUserOpt.get();

            if (user.getFirstName() != null) {
                existingUser.setFirstName(user.getFirstName());
            }
            if (user.getLastName() != null) {
                existingUser.setLastName(user.getLastName());
            }
            if (user.getPassword() != null) {
                existingUser.setPassword(user.getPassword());
            }
            // Save the updated user
            userRepository.save(existingUser);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }


    public boolean verifyUser(String token) {
        Optional<User> userOpt = userRepository.findByVerificationToken(token);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setStatus("Active");
            user.setVerificationToken(null); // Clear the token after verification
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
