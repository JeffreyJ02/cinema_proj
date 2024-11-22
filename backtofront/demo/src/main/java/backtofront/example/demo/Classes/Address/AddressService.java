package backtofront.example.demo.Classes.Address;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backtofront.example.demo.Classes.User.User;
import backtofront.example.demo.Classes.User.UserRepository;

@Service
public class AddressService {

    
    private final AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    // Register user address
    public void registerAddress(String name, String street, String city, String state, 
                                String zip_code, String email) {
        Address address = new Address();
        User user = userRepository.findByEmail(email).get();
        address.setAddressId((int)addressRepository.maxAddressId() + 1);
        address.setName(name);
        address.setStreet(street);
        address.setCity(city);
        address.setState(state);
        address.setZipCode(zip_code);
        address.setUser(user);

        addressRepository.save(address);
    }


    // Find address by user_id
    public Optional<Address> findByUser(User user) {
        return addressRepository.findByUser(user);
    }
}