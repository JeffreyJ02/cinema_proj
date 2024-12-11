package backtofront.example.demo.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import backtofront.example.demo.Address.*;
import backtofront.example.demo.Controller.ControllerMessage.ERRORMessage;
import backtofront.example.demo.Controller.ControllerMessage.OKMessage;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class AddressController {
    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    // returns address_id
    @PostMapping("/register-address")
    public int registerAddress(@RequestBody Address address, @RequestParam int user_id) {
        return addressService.registerAddress(
            address.getName(),
            address.getStreet(),
            address.getCity(),
            address.getState(),
            address.getZipCode(),
            user_id,
            address.isHome()
        );
    }

    @PostMapping("/update-address")
    public ResponseEntity<?> updateAddress(@RequestBody Address address) {
        try {
            addressService.updateAddress(
                address.getName(),
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getZipCode(),
                address.getAddressId()
            );
            return ResponseEntity.ok(new OKMessage("Address updated successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ERRORMessage(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ERRORMessage("Internal server error"));
        }
    }
}
