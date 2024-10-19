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
    @Column(name = "id")
    private Long id;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password; //No Encryption

    @Column(name = "credit_card_number")
    private String creditCardNumber;

    @Column(name = "credit_card_expiration_date")
    private String creditCardExpirationDate;

    @Column(name = "credit_card_ccv")
    private String creditCardCcv;
} 
