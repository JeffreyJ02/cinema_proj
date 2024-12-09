package backtofront.example.demo.Address;

import org.springframework.stereotype.Service;

@Service
public class AddressService {

    
    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    // returns addressId
    public int registerAddress(String name, String street, String city, String state, String zip_code) {
        Address address = new Address();
        address.setAddressId((int)addressRepository.maxAddressId() + 1);
        address.setName(name);
        address.setStreet(street);
        address.setCity(city);
        address.setState(state);
        address.setZipCode(zip_code);

        addressRepository.save(address);
        return address.getAddressId();
    }

    // returns addressId
    public int updateAddress(String name, String street, String city, String state, String zip_code, int address_id) {
        Address address = addressRepository.findByAddressId(address_id).orElseThrow(() -> new IllegalArgumentException("Address not found"));
        address.setName(name);
        address.setStreet(street);
        address.setCity(city);
        address.setState(state);
        address.setZipCode(zip_code);

        addressRepository.save(address);
        return address_id;
    }
}