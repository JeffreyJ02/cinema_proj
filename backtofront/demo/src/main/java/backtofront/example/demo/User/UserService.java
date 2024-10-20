package backtofront.example.demo.User;

import java.util.Optional; 

import org.springframework.stereotype.Service;

import backtofront.example.demo.Address.Address;
import backtofront.example.demo.CreditCard.CreditCard;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new user
    public void registerUser(String first_name, String last_name, String phone_number, 
                             String email, String password, CreditCard credit_card, Address home_address) {
        User user = new User();
        user.setFirst_name(first_name);
        user.setLast_name(last_name);
        user.setPhone_number(phone_number);
        user.setEmail(email);
        user.setPassword(password);
        user.setCredit_card_1(credit_card);
        user.setHome_address(home_address);

        // generate unique user id

        userRepository.save(user);
    }

    // Find a user by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
}
