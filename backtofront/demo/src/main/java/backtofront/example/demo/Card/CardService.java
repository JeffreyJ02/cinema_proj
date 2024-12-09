package backtofront.example.demo.Card;

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
        Card card = cardRepository.findByCardId(card_id).orElseThrow(() -> new IllegalArgumentException("Card not found"));
        card.setCardId((int)cardRepository.maxCardId() + 1);
        card.setCardType(type);
        card.setCardNumber(number);
        card.setExpirationDate(expiration_date);
        card.setSecurityCode(security_code);
        card.setAddressId(address_id);

        cardRepository.save(card);
        return card_id;
    }

}
