package backtofront.example.demo.Address;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    List<Address> findAllByUserId(int user_id);
    Optional<Address> findByAddressId(int id);

    @Query("select max(a.addressId) from Address a")
    int maxAddressId();

    @Modifying
    @Query("update Address a set a.name = ?1, a.street = ?2, a.city = ?3, a.state = ?4, a.zipCode = ?5 where a.addressId = ?6")
    void updateAddress(String name, String street, String city, String state, String zip, int address_id);
}