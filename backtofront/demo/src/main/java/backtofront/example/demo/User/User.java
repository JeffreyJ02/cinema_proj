package backtofront.example.demo.User;

import backtofront.example.demo.Address.Address;
import backtofront.example.demo.CreditCard.CreditCard;
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
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String first_name;

    @Column(name = "last_name", nullable = false)
    private String last_name;

    @Column(name = "phone_number", unique = true, nullable = false)
    private String phone_number;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    // encrypt
    @Column(name = "password", nullable = false)
    private String password; //No Encryption

    // encrypt
    @Column(name = "credit_card_1")
    private CreditCard credit_card_1;

    // encrypt
    @Column(name = "credit_card_2")
    private CreditCard credit_card_2;

    // encrypt
    @Column(name = "credit_card_3")
    private CreditCard credit_card_3;

    @Column(name = "home_address")
    private Address home_address;
} 
