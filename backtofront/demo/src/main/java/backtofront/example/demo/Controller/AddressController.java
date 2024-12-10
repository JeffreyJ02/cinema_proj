package backtofront.example.demo.Controller;

import org.springframework.web.bind.annotation.*;
import backtofront.example.demo.Address.*;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class AddressController {
    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    // returns addressId
    @PostMapping("/register-address")
    public int registerUserAddress(@RequestBody Address address) {
        return addressService.registerAddress(
            address.getName(),
            address.getStreet(),
            address.getCity(),
            address.getState(),
            address.getZipCode()
        );
    }

    // returns addressId
    @PostMapping("/update-address")
    public int registerUserAddress(@RequestBody Address address, @RequestParam int addressId) {
        return addressService.updateAddress(
            address.getName(),
            address.getStreet(),
            address.getCity(),
            address.getState(),
            address.getZipCode(),
            addressId
        );
    }
}
