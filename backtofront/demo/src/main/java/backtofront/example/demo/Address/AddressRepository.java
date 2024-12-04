package backtofront.example.demo.Address;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    Optional<Address> findById(int id);

    @Query("select max(a.addressId) from Address a")
    int maxAddressId();

    @Modifying
    @Query("update Address a set a.street = ?1, a.city = ?2, a.state = ?3, a.zipCode = ?4 where a.addressId = ?5")
    void updateAddress(String street, String city, String state, String zip, int address_id);
}