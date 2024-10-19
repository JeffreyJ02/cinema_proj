package backtofront.example.demo.CreditCard;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import backtofront.example.demo.Address.Address;

@Data
@Entity
public class CreditCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "credit_card_type")
    private String creditCardType;

    @Column(name = "credit_card_number")
    private String creditCardNumber;

    @Column(name = "credit_card_expiration_date")
    private String creditCardExpirationDate;

    @Column(name = "credit_card_ccv")
    private String creditCardCcv;

    @Column(name = "billing_address")
    private Address billing_address;
} 