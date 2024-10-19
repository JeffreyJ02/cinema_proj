package backtofront.example.demo.Address;

import org.springframework.stereotype.Service;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    // Register a new address
    public void registerAddress(String street_info, String city, String state, String zip_code) {
        Address address = new Address();
        address.setStreet_info(street_info);
        address.setCity(city);
        address.setState(state);
        address.setZip_code(zip_code);

        addressRepository.save(address);

    }
}
