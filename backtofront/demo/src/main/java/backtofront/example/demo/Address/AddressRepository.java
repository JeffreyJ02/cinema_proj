package backtofront.example.demo.Address;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backtofront.example.demo.User.User;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    Optional<Address> findByUserId(User user);
    Optional<Address> findById(int id);
    // for updating user address
    @Modifying
    @Query("update Address a set a.street = ?1, a.city = ?2, a.state = ?3, a.zipCode = ?4 where a.userId = ?5")
    void updateAddress(String street, String city, String state, String zip, User user);
}