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

    // address has get email?
    /* @PostMapping("/register-address")
    public ResponseEntity<?> registerUserAddress(@RequestBody Address address) {
        try {
            addressService.registerAddress(
                    address.getName(),
                    address.getStreet(),
                    address.getCity(),
                    address.getState(),
                    address.getZipCode(),
                    address.getEmail());
            return ResponseEntity.ok(new ResponseMessage("User address registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
        }
    } */
}
