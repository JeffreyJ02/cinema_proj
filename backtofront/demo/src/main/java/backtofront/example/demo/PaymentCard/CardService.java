package backtofront.example.demo.PaymentCard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backtofront.example.demo.Address.Address;
import backtofront.example.demo.Address.AddressRepository;
import backtofront.example.demo.User.User;
import backtofront.example.demo.User.UserRepository;

@Service
public class CardService {

    private final CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    // Register a new credit card
    public void registerCard(String type, String number, String expiration_date, 
                             String security_code, String email) {
        Card card = new Card();
        User user = userRepository.findByEmail(email).get();
        Address address = addressRepository.findByUser(user).get();
        card.setCardId((int)cardRepository.count() + 1);
        card.setCard_type(type);
        card.setCard_number(number);
        card.setExpirationDate(expiration_date);
        card.setSecurityCode(security_code);
        card.setAddress(address);
        card.setUser(user);

        cardRepository.save(card);
    }
}
