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

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "card_id_1")
    private int card_id_1;

    @Column(name = "card_id_2")
    private int card_id_2;

    @Column(name = "card_id_3")
    private int card_id_3;

    @Column(name = "home_address_id")
    private int home_address_id;
}
