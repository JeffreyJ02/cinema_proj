package backtofront.example.demo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MyController {

    @GetMapping("/message")
    public ResponseEntity<Map<String, String>> getMessage() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello from the backend!");
        return ResponseEntity.ok(response);
    }
}
