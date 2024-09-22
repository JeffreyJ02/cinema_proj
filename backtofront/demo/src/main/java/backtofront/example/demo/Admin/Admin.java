package backtofront.example.demo.Admin;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Admin {
    @Id
    private String username; // unique identifier
    private String password; // store hashed password
}
