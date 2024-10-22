package backtofront.example.demo.CreditCard;

import org.springframework.stereotype.Service;

import backtofront.example.demo.User.*;
import backtofront.example.demo.Address.Address;

@Service
public class CreditCardService {

    private final UserRepository userRepository;

    public CreditCardService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new credit card
    // card = 1 2 or 3 depending on which card is being updated
    public void registerCreditCard(Long id, int card, String credit_card_type, String credit_card_number,
                                   String credit_card_expiration_date, String credit_card_ccv, Address billing_address) {
        CreditCard credit_card = new CreditCard();
        credit_card.setCreditCardType(credit_card_type);
        credit_card.setCreditCardNumber(credit_card_number);
        credit_card.setCreditCardExpirationDate(credit_card_expiration_date);
        credit_card.setCreditCardCcv(credit_card_ccv);
/*
        Address billing_address = new Address();
        billing_address.setStreet_info(street_info);
        billing_address.setCity(city);
        billing_address.setState(state);
        billing_address.setZip_code(zip_code);
*/
        credit_card.setBilling_address(billing_address);

        User user = userRepository.findById(id).get();
        
        if (card == 1)
            user.setCredit_card_1(credit_card);
        else if (card == 2)
            user.setCredit_card_2(credit_card);
        else 
            user.setCredit_card_3(credit_card);
        
        // update info?
    }
}
