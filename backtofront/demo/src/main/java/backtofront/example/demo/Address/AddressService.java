package backtofront.example.demo.Address;

import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    // Register user address
    public void registerAddress(String street, String city, String state, String zip_code, int user_id) {
        Address address = new Address();
        address.setAddress_id((int)addressRepository.count() + 1);
        address.setStreet(street);
        address.setCity(city);
        address.setState(state);
        address.setZip_code(zip_code);
        address.setUser_id(user_id);

        addressRepository.save(address);
    }

    // Find address by user_id
    public Optional<Address> findByUserId(int user_id) {
        return addressRepository.findByUserId(user_id);
    }
}
