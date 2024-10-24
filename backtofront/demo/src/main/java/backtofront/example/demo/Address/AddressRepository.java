package backtofront.example.demo.Address;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    Optional<Address> findByUserId(int id);

    @Modifying
    @Query("update Address a set a.street = ?1, a.city = ?2, a.state = ?3, a.zipCode = ?4 where a.user_id = ?5")
    void updateAddress(String street, String city, String state, String zip, int user_id);
}