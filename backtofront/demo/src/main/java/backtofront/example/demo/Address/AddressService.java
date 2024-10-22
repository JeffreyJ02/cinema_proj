package backtofront.example.demo.Address;

import org.springframework.stereotype.Service;

import backtofront.example.demo.User.*;

@Service
public class AddressService {

    private final UserRepository userRepository;

    public AddressService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new address
    public void registerUserAddress(Long id, String street_info, String city, String state, String zip_code) {
        Address address = new Address();
        address.setStreet_info(street_info);
        address.setCity(city);
        address.setState(state);
        address.setZip_code(zip_code);

        User user = userRepository.findById(id).get();
        user.setHome_address(address);

        // update info?
    }
}
