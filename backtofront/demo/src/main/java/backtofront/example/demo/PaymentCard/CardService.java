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
                             String security_code, int address_id, int user_id) {
        Card card = new Card();
        card.setCard_id((int)cardRepository.count() + 1);
        card.setCard_type(type);
        card.setCard_number(number);
        card.setExpiration_date(expiration_date);
        card.setSecurity_code(security_code);
        card.setAddress_id(address_id);
        card.setUser_id(user_id);

        cardRepository.save(card);
    }
}
