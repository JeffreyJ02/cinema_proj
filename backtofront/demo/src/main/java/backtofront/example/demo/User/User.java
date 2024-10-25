package backtofront.example.demo.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int user_id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "phone_number", nullable = false)
    private Long phoneNumber;

    @Column(name = "register_for_promotions", nullable = false)
    private boolean registerForPromotions;

    @Column(name = "credit_card_number", nullable = true)
    private String creditCardNumber; 

    @Column(name = "expiration_date", nullable = true)
    private String expirationDate; 

    @Column(name = "cvv", nullable = true)
    private String cvv; 

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "street", nullable = true)
    private String street;

    @Column(name = "city", nullable = true)
    private String city;

    @Column(name = "state", nullable = true)
    private String state;

    @Column(name = "zip_code", nullable = true)
    private String zipCode;

}
