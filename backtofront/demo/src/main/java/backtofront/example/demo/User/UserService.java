package backtofront.example.demo.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Updated registerUser method to include optional credit card fields
    public void registerUser(String firstName, String lastName, String email, String password, boolean registerForPromotions, String creditCardNumber, String expirationDate, String cvv, String street, String city, String state, String zipCode) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }
        User newUser = new User();
        newUser.setUser_id((int)userRepository.count() + 1);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);
        newUser.setPassword(password);
        newUser.setRegisterForPromotions(registerForPromotions);
        newUser.setStatus("Active");
        newUser.setStreet(street);
        newUser.setCity(city);
        newUser.setZipCode(zipCode);

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

    public void updateProfile(String email, String firstName, String lastName, String street, String city, String state, String zipCode, Boolean registerForPromotions) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Update fields only if they are provided (not null or empty)
        if (firstName != null && !firstName.isEmpty()) {
            user.setFirstName(firstName);
        }
        if (lastName != null && !lastName.isEmpty()) {
            user.setLastName(lastName);
        }
        if (street != null && !street.isEmpty()) {
            user.setStreet(street);
        }
        if (city != null && !city.isEmpty()) {
            user.setCity(city);
        }
        if (state != null && !state.isEmpty()) {
            user.setState(state);
        }
        if (zipCode != null && !zipCode.isEmpty()) {
            user.setZipCode(zipCode);
        }
        if (registerForPromotions != null) {
            user.setRegisterForPromotions(registerForPromotions);
        }

        userRepository.save(user);
    }

    public void updatePassword(String email, String currentPassword, String newPassword) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (!user.getPassword().equals(currentPassword)) {
            throw new IllegalArgumentException("Current password is incorrect");
        }
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    // Method to retrieve user profile by email
    public User getUserProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
