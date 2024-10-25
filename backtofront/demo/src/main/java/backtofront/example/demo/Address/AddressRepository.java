package backtofront.example.demo.Address;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backtofront.example.demo.PaymentCard.Card;
import backtofront.example.demo.User.User;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    Optional<Address> findByUserId(int user_id);
    Optional<Address> findByCardId(int card_id);

    // for updating user address
    @Modifying
    @Query("update Address a set a.street = ?1, a.city = ?2, a.state = ?3, a.zipCode = ?4 where a.user = ?5")
    void updateAddress(String street, String city, String state, String zip, User user);

    // for updating card address
    @Modifying
    @Query("update Address a set a.street = ?1, a.city = ?2, a.state = ?3, a.zipCode = ?4 where a.card = ?5")
    void updateAddress(String street, String city, String state, String zip, Card card);
}