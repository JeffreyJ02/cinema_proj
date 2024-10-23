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
    @Column(name = "user_id", nullable = false)
    private int user_id; 

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    // encrypt
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "register_for_promotions", nullable = false)
    private boolean registerForPromotions;

    @Column(name = "card_type1", nullable = true)
    private String card_type1;

    @Column(name = "credit_card_number1", nullable = true)
    private String creditCardNumber1; 

    @Column(name = "expiration_date1", nullable = true)
    private String expirationDate1; 

    @Column(name = "cvv1", nullable = true)
    private String cvv1;
    
    @Column(name = "card_type2", nullable = true)
    private String card_type2;

    @Column(name = "credit_card_number2", nullable = true)
    private String creditCardNumber2; 

    @Column(name = "expiration_date2", nullable = true)
    private String expirationDate2; 

    @Column(name = "cvv2", nullable = true)
    private String cvv2;

    @Column(name = "card_type3", nullable = true)
    private String card_type3;

    @Column(name = "credit_card_number3", nullable = true)
    private String creditCardNumber3; 

    @Column(name = "expiration_date3", nullable = true)
    private String expirationDate3; 

    @Column(name = "cvv3", nullable = true)
    private String cvv3;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "street", nullable = true)
    private String street;

    @Column(name = "city", nullable = true)
    private String city;

    @Column(name = "state", nullable = true)
    private String state;

    @Column(name = "zipCode", nullable = true)
    private String zipCode;

}
