package backtofront.example.demo.Card;

import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class CardService {

    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    // returns cardId
    public int registerCard(String type, String number, String expiration_date, 
                             String security_code, int address_id) {
        Card card = new Card();
        card.setCardId((int)cardRepository.maxCardId() + 1);
        card.setCardType(type);
        card.setCardNumber(number);
        card.setExpirationDate(expiration_date);
        card.setSecurityCode(security_code);
        card.setAddressId(address_id);

        cardRepository.save(card);
        return card.getCardId();
    }

    // returns cardId
    public int updateCard(String type, String number, String expiration_date, 
                          String security_code, int address_id, int card_id) {
        Optional<Card> opt_card = cardRepository.findByCardId(card_id);
        if (opt_card.isPresent()) {
            Card card = opt_card.get();
            card.setCardType(type);
            card.setCardNumber(number);
            card.setExpirationDate(expiration_date);
            card.setSecurityCode(security_code);
            card.setAddressId(address_id);
            cardRepository.save(card);
            return card_id;
        }
        else return registerCard(type, number, expiration_date, security_code, address_id);
    }

}
