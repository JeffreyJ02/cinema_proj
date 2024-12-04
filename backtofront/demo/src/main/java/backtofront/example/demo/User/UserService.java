package backtofront.example.demo.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    // Updated registerUser method to include optional credit card fields
    public void registerUser(String firstName, String lastName, String email,
            String phone_number, String password,
            int registerForPromotions) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }
        User newUser = new User();
        newUser.setUserId(userRepository.maxUserId() + 1);
        newUser.setFirstName(firstName);
        newUser.setLastName(lastName);
        newUser.setEmail(email);
        newUser.setPhone_number(phone_number);
        newUser.setPassword(password);
        newUser.setPromotions(registerForPromotions);
        newUser.setStatus("Active");

        userRepository.save(newUser);
    }

    // Find a user by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<String> getEmailsForPromo() {
        List<User> users = userRepository.findByPromotions(1);
        List<String> emails = new ArrayList<>();
        for (User user : users) emails.add(user.getEmail());
        return emails;
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

    public void updateProfile(String email, String firstName, String lastName,  String phoneNumber, Integer registerForPromotions) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));


        // Update fields only if they are provided (not null or empty)
        if (firstName != null && !firstName.isEmpty()) {
            user.setFirstName(firstName);
        }
        if (lastName != null && !lastName.isEmpty()) {
            user.setLastName(lastName);
        }
        if(phoneNumber != null){
            user.setPhone_number(phoneNumber);
        }
        if (registerForPromotions != null) {
            user.setPromotions(registerForPromotions);
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

    public void setTempPassword(String email, String tempPassword) {
        User user = userRepository.findByEmail(email).get();
        user.setPassword(tempPassword);
        userRepository.save(user);
    }

    // Method to retrieve user profile by email
    public User getUserProfile(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}
