package backtofront.example.demo.CreditCard;

import org.springframework.stereotype.Service;

import backtofront.example.demo.Address.Address;

@Service
public class CreditCardService {

    private final CreditCardRepository creditCardRepository;

    public CreditCardService(CreditCardRepository creditCardRepository) {
        this.creditCardRepository = creditCardRepository;
    }

    // Register a new user
    public void registerCreditCard(String credit_card_type, String credit_card_number,
                                   String credit_card_expiration_date, String credit_card_ccv,
                                   Address billing_address) {
        CreditCard credit_card = new CreditCard();
        credit_card.setCreditCardType(credit_card_type);
        credit_card.setCreditCardNumber(credit_card_number);
        credit_card.setCreditCardExpirationDate(credit_card_expiration_date);
        credit_card.setCreditCardCcv(credit_card_ccv);
        credit_card.setBilling_address(billing_address);
    
        creditCardRepository.save(credit_card);

    }
}
