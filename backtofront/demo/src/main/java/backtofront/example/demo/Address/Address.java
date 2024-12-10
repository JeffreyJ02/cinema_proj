package backtofront.example.demo.Address;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private int addressId;

    @Column(name = "name")
    private String name;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;
    
    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "street")
    private String street;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "is_home")
    private boolean home;

}