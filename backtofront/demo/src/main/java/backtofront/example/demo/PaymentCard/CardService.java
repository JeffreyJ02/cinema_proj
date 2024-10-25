package backtofront.example.demo.PaymentCard;

import org.springframework.stereotype.Service;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    // Register a new credit card
    public void registerCard(String type, String number, String expiration_date, 
                             String security_code) {
        Card card = new Card();
        card.setId((int)cardRepository.count() + 1);
        card.setType(type);
        card.setNumber(number);
        card.setExpirationDate(expiration_date);
        card.setSecurityCode(security_code);

        cardRepository.save(card);
    }
}
