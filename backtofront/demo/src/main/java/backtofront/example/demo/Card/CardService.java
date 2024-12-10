package backtofront.example.demo.Card;

import org.springframework.stereotype.Service;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    // Register a new credit card
    public void registerCard(String type, String number, String expiration_date, 
                             String security_code, int address_id) {
        Card card = new Card();
        card.setCardId((int)cardRepository.maxCardId() + 1);
        card.setCard_type(type);
        card.setCard_number(number);
        card.setExpirationDate(expiration_date);
        card.setSecurityCode(security_code);
        card.setAddress_id(address_id);

        cardRepository.save(card);
    }
}
