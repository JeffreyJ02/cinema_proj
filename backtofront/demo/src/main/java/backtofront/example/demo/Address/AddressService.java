package backtofront.example.demo.Address;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class AddressService {

    
    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public int registerAddress(String name, String street, String city, String state, String zip_code, int user_id, boolean home) {
        Address address = new Address();
        address.setAddressId((int)addressRepository.maxAddressId() + 1);
        address.setName(name);
        address.setStreet(street);
        address.setCity(city);
        address.setState(state);
        address.setZipCode(zip_code);
        address.setUserId(user_id);
        address.setHome(home);

        addressRepository.save(address);
        return address.getAddressId();
    }

    public Address findAddressByAddressId(int address_id) {
        Optional<Address> opt_addr = addressRepository.findByAddressId(address_id);
        if (opt_addr.isPresent()) return opt_addr.get();
        return new Address();
    }

    public Address findUserHomeAddress(int user_id) {
        List<Address> addrs = addressRepository.findAllByUserId(user_id);
        for (Address addr : addrs) {
            if (addr.isHome()) return addr;
        }
        return new Address();
    }

    public void updateAddress(String name, String street, String city, String state, String zip_code, int address_id) {
        addressRepository.updateAddress(name, street, city, state, zip_code, address_id);
    }
}