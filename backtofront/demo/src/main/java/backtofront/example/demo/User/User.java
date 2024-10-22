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

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password; // No Encryption yet

    @Column(name = "register_for_promotions", nullable = false)
    private boolean registerForPromotions;

    @Column(name = "credit_card_number", nullable = true)
    private String creditCardNumber; // Optional

    @Column(name = "expiration_date", nullable = true)
    private String expirationDate; // Optional

    @Column(name = "cvv", nullable = true)
    private String cvv; // Optional

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "verification_token", nullable = true)
    private String verificationToken;
}
