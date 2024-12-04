package backtofront.example.demo.Card;

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

    @Column(name = "card_id", unique = true)
    private int cardId;

    @Column(name = "card_type")
    private String card_type;

    @Column(name = "card_number")
    private String card_number;

    @Column(name = "expiration_date")
    private String expirationDate;

    @Column(name = "security_code")
    private String securityCode;

    @Column(name = "address_id")
    private int address_id;

} 