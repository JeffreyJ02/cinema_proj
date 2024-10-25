package backtofront.example.demo.PaymentCard;

import org.springframework.stereotype.Service;

import backtofront.example.demo.User.User;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    // Register a new credit card
    public void registerCard(String type, String number, String expiration_date, 
                             String security_code, User user, ) {
        Card card = new Card();
        card.setId((int)cardRepository.count() + 1);
        card.setType(type);
        card.setNumber(number);
        card.setExpirationDate(expiration_date);
        card.setSecurityCode(security_code);
        card.setUser(user);

        cardRepository.save(card);
    }
}
