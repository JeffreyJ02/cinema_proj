package backtofront.example.demo.Address;

import java.util.Optional;

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
        Optional<Address> opt_addr = addressRepository.findByAddressId(address_id);
        
        if (opt_addr.isPresent()) {
            Address address = opt_addr.get();
            address.setName(name);
            address.setStreet(street);
            address.setCity(city);
            address.setState(state);
            address.setZipCode(zip_code);

            addressRepository.save(address);
            return address_id;
        }
        else return registerAddress(name, street, city, state, zip_code);
        
    }
}