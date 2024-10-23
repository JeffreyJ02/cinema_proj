package backtofront.example.demo.PaymentCard;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "card_id")
    private int card_id;

    @Column(name = "card_type")
    private String card_type;

    @Column(name = "card_number")
    private String card_number;

    @Column(name = "expiration_date")
    private String expiration_date;

    @Column(name = "security_code")
    private String security_code;

    @Column(name = "address_id")
    private int address_id;

    @Column(name = "user_id")
    private int user_id;
} 