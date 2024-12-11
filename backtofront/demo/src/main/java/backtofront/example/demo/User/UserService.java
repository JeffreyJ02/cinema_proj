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

/*     public void updateUser(User user) {
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
    } */

    public void updateProfile(String email, String firstName, String lastName,  String phoneNumber, int promotions) {
        System.out.println("Updating profile for: " + email);

      
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        System.out.println("User found: " + user);
        System.out.println(user.getUserId());
        userRepository.updateUserById(firstName, lastName, phoneNumber, promotions, user.getUserId());
    }

    public void updatePassword(String email, String currentPassword, String newPassword) {
        System.out.println("Updating password for: " + email);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("User not found"));
        System.out.println("user found");
        //if (!user.getPassword().equals(currentPassword)) throw new IllegalArgumentException("Current password is incorrect");
        System.out.println("saving password");
        userRepository.updatePassword(newPassword, email);
    }

    // OLD METHOD UNUSED
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
