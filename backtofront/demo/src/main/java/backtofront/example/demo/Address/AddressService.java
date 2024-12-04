package backtofront.example.demo.Address;

import org.springframework.stereotype.Service;

@Service
public class AddressService {

    
    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public void registerAddress(String name, String street, String city, String state, 
                                String zip_code) {
        Address address = new Address();
        address.setAddressId((int)addressRepository.maxAddressId() + 1);
        address.setName(name);
        address.setStreet(street);
        address.setCity(city);
        address.setState(state);
        address.setZipCode(zip_code);

        addressRepository.save(address);
    }
}