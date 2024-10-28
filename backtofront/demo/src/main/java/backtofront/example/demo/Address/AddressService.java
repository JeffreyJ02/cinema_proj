package backtofront.example.demo.Address;

import java.util.Optional;
import org.springframework.stereotype.Service;

import backtofront.example.demo.PaymentCard.Card;
import backtofront.example.demo.User.User;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    // Register user address
    public void registerAddress(String name, String street, String city, String state, 
                                String zip_code, User user) {
        Address address = new Address();
        address.setName(name);
        address.setId((int)addressRepository.count() + 1);
        address.setStreet(street);
        address.setCity(city);
        address.setState(state);
        address.setZipCode(zip_code);
        address.setUserId(user);

        addressRepository.save(address);
    }


    // Find address by user_id
    public Optional<Address> findByUserId(User user) {
        return addressRepository.findByUserId(user);
    }
}