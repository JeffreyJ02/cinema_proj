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
    @Column(name = "user_id", unique = true, nullable = false)
    private int userId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "phone_number", nullable = false)
    private String phone_number;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "administrator", nullable = false)
    private int admin = 0;

    @Column(name = "promotions", nullable = false)
    private int promotions = 0;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "card_1_id")
    private int card1Id;

    @Column(name = "card_2_id")
    private int card2Id;

    @Column(name = "card_3_id")
    private int card3Id;

    @Column(name = "home_address_id")
    private int homeAddressId;

}