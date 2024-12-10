package backtofront.example.demo.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
  
    // update to include card and address?
    public void registerUser(String firstName, String lastName, String email, 
                             String phone_number, String password, int registerForPromotions) {

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

    // card = 1,2, or 3
    public void updateCard(int user_id, int card_id, int card) {
        User user = userRepository.findByUserId(user_id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        switch(card) {
            case 1: user.setCard1Id(card_id);
                    break;
            case 2: user.setCard2Id(card_id);
                    break;
            case 3: user.setCard3Id(card_id);
                    break;
        }
        userRepository.save(user);
    }

    public void updateHomeAddress(int user_id, int address_id) {
        User user = userRepository.findByUserId(user_id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setHomeAddressId(address_id);
        userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<String> getEmailsForPromo() {
        List<User> users = userRepository.findByPromotions(1);
        List<String> emails = new ArrayList<>();
        for (User user : users) emails.add(user.getEmail());
        return emails;
    }

    public void updateUser(User user) {
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
            userRepository.save(existingUser);
        } 
        else throw new IllegalArgumentException("User not found");
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
        if (!user.getPassword().equals(currentPassword)) throw new IllegalArgumentException("Current password is incorrect");
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    public void setTempPassword(String email, String tempPassword) {
        User user = userRepository.findByEmail(email).get();
        user.setPassword(tempPassword);
        userRepository.save(user);
    }

    public User getUserProfile(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public void deleteUserById(int user_id) {
        userRepository.deleteByUserId(user_id);
    }
}
