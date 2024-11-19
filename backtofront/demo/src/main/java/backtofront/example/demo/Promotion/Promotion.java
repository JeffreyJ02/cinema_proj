package backtofront.example.demo.Promotion;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Promotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "promotion_id", unique = true, nullable = false)
    private int promoId;

    @Column(name = "bogo", nullable = false)
    private boolean bogo;

    @Column(name = "discount_percentage", nullable = false)
    private int discountPercent;

    @Column(name = "promo_code", nullable = false)
    private String promoCode;

    @Column(name = "expiration_date")
    private Date expirationDate;
}