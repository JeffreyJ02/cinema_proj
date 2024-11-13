package backtofront.example.demo.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import backtofront.example.demo.Address.Address;
import backtofront.example.demo.Address.AddressService;
import backtofront.example.demo.Movie.Movie;
import backtofront.example.demo.Movie.MovieService;
import backtofront.example.demo.PaymentCard.Card;
import backtofront.example.demo.PaymentCard.CardService;
import backtofront.example.demo.User.User;
import backtofront.example.demo.User.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class Controller {

    private final UserService userService;
    private final CardService cardService;
    private final AddressService addressService;
    private final MovieService movieService;

    public Controller(UserService userService, CardService cardService, 
                      AddressService addressService, MovieService movieService) {
        this.userService = userService;
        this.cardService = cardService;
        this.addressService = addressService;
        this.movieService = movieService;
    }

    @PostMapping("/register-user")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            userService.registerUser(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhone_number(),
                user.getPassword(),
                user.getRegisterForPromos() // Get the boolean value
            );
            return ResponseEntity.ok(new ResponseMessage("User registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    @PostMapping("/register-address") 
    public ResponseEntity<?> registerUserAddress(@RequestBody Address address) {
        try {
            addressService.registerAddress(
                address.getName(),
                address.getStreet(),
                address.getCity(),
                address.getState(),
                address.getZipCode(),
                address.getUserId()
            );
            return ResponseEntity.ok(new ResponseMessage("User address registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    @PostMapping("/register-card")
    public ResponseEntity<?> registerCard(@RequestBody Card card) {
        try {
            cardService.registerCard(
                card.getCard_type(),
                card.getCard_number(),
                card.getExpirationDate(),
                card.getSecurityCode(),
                card.getAddress(),
                card.getUserId()
            );
            return ResponseEntity.ok(new ResponseMessage("Card registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    // User Login Endpoint
    @PostMapping("/login-user")
    public ResponseEntity<Object> loginUser(@RequestBody User user) {
        // Check if the user exists
        Optional<User> existingUser = userService.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            // Verify the password
            System.out.println("Recieved password: " + user.getPassword());
            System.out.println("User password: " + existingUser.get().getPassword());
            if (existingUser.get().getPassword().equals(user.getPassword())) {
                // Login successful, return a JSON object
                return ResponseEntity.ok(new LoginResponse("Login successful", existingUser.get().getEmail()));
            } else {
                // Password mismatch
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Incorrect password"));
            }
        } else {
            // User not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("User not found"));
        }
    }

    // edit this
    @GetMapping("/user-profile")
    public ResponseEntity<Object> getUserProfile(@RequestParam String email) {
        try {
            User user = userService.getUserProfile(email);
            UserProfileResponse response = new UserProfileResponse(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhone_number(),
                user.getPassword(),
                user.getRegisterForPromos()
            );
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    @PostMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest updateProfileRequest) {
        try {
            userService.updateProfile(
                updateProfileRequest.getEmail(),
                updateProfileRequest.getFirstName(),
                updateProfileRequest.getLastName(),
                updateProfileRequest.getPhoneNumber(),
                updateProfileRequest.isRegisterForPromotions()
            );
            return ResponseEntity.ok(new ResponseMessage("Profile updated successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    // Update user password
    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        try {
            userService.updatePassword(
                updatePasswordRequest.getEmail(),
                updatePasswordRequest.getCurrentPassword(),
                updatePasswordRequest.getNewPassword()
            );
            return ResponseEntity.ok(new ResponseMessage("Password updated successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    // set temp password when forgotten
    @PostMapping("/temp-password")
    public ResponseEntity<?> setTempPassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        try {
            userService.setTempPassword(
                updatePasswordRequest.getEmail(),
                updatePasswordRequest.getNewPassword()
            );
            return ResponseEntity.ok(new ResponseMessage("Password updated successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        System.out.println("Fetched movies: " + movies);
        return movies;
    }

    // Search for movies by title
    @GetMapping("/search-by-title")
    public List<Movie> getMovieByTitle(@RequestParam(required = false) String title) {
        if (title == null || title.isEmpty()) {
            return new ArrayList<>();  // Return an empty list if no title is provided
        }
        return movieService.findMoviesByTitle(title);  // Use movieService for the search
    }

    // Search for movies by id
    @GetMapping("/search-by-id")
    public Movie getMovieById(@RequestParam(required = false) Long id) {
        return movieService.findMovieById(id);  // Use movieService for the search
    }

    @DeleteMapping("/delete-movie")
    public ResponseEntity<String> deleteMovie(@PathVariable Integer id) {
        boolean isDeleted = movieService.deleteMovieById(id);
        if (isDeleted) {
            return ResponseEntity.ok("Movie deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found!");
        }
    }

    @PostMapping("/add-movie")
    public ResponseEntity<?> addMovie(@RequestBody Movie movie) {
        try {
            movieService.addMovie(
                movie.getTitle(),
                movie.getDescription(),
                movie.getReleaseDate(),
                movie.getGenre(),
                movie.getTrailerUrl(),
                movie.getCategory(),
                movie.getImageUrl(),
                movie.getAgeRating(),
                movie.getDirector(),
                movie.getProducer()
            );
            return ResponseEntity.ok(new ResponseMessage("Card registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Internal server error"));
        }
    }

    

    // Response classes
    private static class LoginResponse {
        @SuppressWarnings("FieldMayBeFinal")
        private String message;
        @SuppressWarnings("FieldMayBeFinal")
        private String email;

        public LoginResponse(String message, String email) {
            this.message = message;
            this.email = email;
        }

        @SuppressWarnings("unused")
        public String getMessage() {
            return message;
        }

        @SuppressWarnings("unused")
        public String getEmail() {
            return email;
        }
    }

    private static class ErrorResponse {
        @SuppressWarnings("FieldMayBeFinal")
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        @SuppressWarnings("unused")
        public String getError() {
            return error;
        }
    }

    // ResponseMessage class
    private static class ResponseMessage {
        @SuppressWarnings("FieldMayBeFinal")
        private String message;
    
        public ResponseMessage(String message) {
            this.message = message;
        }
    
        @SuppressWarnings("unused")
        public String getMessage() {
            return message;
        }
    }
    
    // User profile response class
    private static class UserProfileResponse {
        @SuppressWarnings("FieldMayBeFinal")
        private String firstName;
        @SuppressWarnings("FieldMayBeFinal")
        private String lastName;
        @SuppressWarnings("FieldMayBeFinal")
        private String email;
        @SuppressWarnings("FieldMayBeFinal")
        private String phoneNumber;
        @SuppressWarnings("FieldMayBeFinal")
        private String password;
        @SuppressWarnings("FieldMayBeFinal")
        private int registerForPromos;
    
        public UserProfileResponse(String firstName, String lastName, String email, String phoneNumber, String password, int registerForPromos ) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.password = password;
            this.registerForPromos = registerForPromos;    
        }
    
        @SuppressWarnings("unused")
        public String getFirstName() {
            return firstName;
        }
    
        @SuppressWarnings("unused")
        public String getLastName() {
            return lastName;
        }
    
        @SuppressWarnings("unused")
        public String getEmail() {
            return email;
        }

        @SuppressWarnings("unused")
        public String getPhoneNumber(){
            return phoneNumber;
        }
    
        @SuppressWarnings("unused")
        public String getPassword(){
            return password;
        }
    
        @SuppressWarnings("unused")
        public int getRegisterForPromos() {
            return registerForPromos;
        }    
    }

    // Card profile response class
    private static class CardProfileResponse {
        @SuppressWarnings("FieldMayBeFinal")
        private int card_id;
        @SuppressWarnings("FieldMayBeFinal")
        private String card_type;
        @SuppressWarnings("FieldMayBeFinal")
        private String card_number;
        @SuppressWarnings("FieldMayBeFinal")
        private String expiration_date;
        @SuppressWarnings("FieldMayBeFinal")
        private String security_code;

        public CardProfileResponse(int card_id, String card_type, String card_number,
                                String expiration_date, String security_code) {
            this.card_id = card_id;
            this.card_type = card_type;
            this.card_number = card_number;
            this.expiration_date = expiration_date;
            this.security_code = security_code;
        }

        @SuppressWarnings("unused")
        public int getCard_id() {
            return card_id;
        }

        @SuppressWarnings("unused")
        public String getCard_type() {
            return card_type;
        }

        @SuppressWarnings("unused")
        public String getCard_number() {
            return card_number;
        }

        @SuppressWarnings("unused")
        public String getExpiration_date(){
            return expiration_date;
        }

        @SuppressWarnings("unused")
        public String getSecurity_code() {
            return security_code;
        }
    }

    // Address profile response class
    private static class AddressProfileResponse {
        @SuppressWarnings("FieldMayBeFinal")
        private int address_id;
        @SuppressWarnings("FieldMayBeFinal")
        private String street;
        @SuppressWarnings("FieldMayBeFinal")
        private String city;
        @SuppressWarnings("FieldMayBeFinal")
        private String state;
        @SuppressWarnings("FieldMayBeFinal")
        private String zip_code;

        public AddressProfileResponse(int address_id, String street, String city,
                                String state, String zip_code) {
            this.address_id = address_id;
            this.street = street;
            this.city = city;
            this.state = state;
            this.zip_code = zip_code;
        }

        @SuppressWarnings("unused")
        public int getAddress_id() {
            return address_id;
        }

        @SuppressWarnings("unused")
        public String getStreet() {
            return street;
        }

        @SuppressWarnings("unused")
        public String getCity() {
            return city;
        }

        @SuppressWarnings("unused")
        public String getState(){
            return state;
        }

        @SuppressWarnings("unused")
        public String getZip_code() {
            return zip_code;
        }
    }

    // Request classes for profile and password updates
    private static class UpdateProfileRequest {
        private String email;
        private String firstName;
        private String lastName;
        private String phoneNumber;
        private Integer registerForPromotions;


        // Getters and Setters
        public String getEmail() {
            return email;
        }


        public void setEmail(String email) {
            this.email = email;
        }


        public String getFirstName() {
            return firstName;
        }


        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }


        public String getLastName() {
            return lastName;
        }


        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public Integer isRegisterForPromotions() {
            return registerForPromotions;
        }


        public void setRegisterForPromotions(Integer registerForPromotions) {
            this.registerForPromotions = registerForPromotions;
        }


        public String getPhoneNumber() {
            return phoneNumber;
        }


        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }
        }

    private static class UpdatePasswordRequest {
        private String email;
        private String currentPassword;
        private String newPassword;


        // Getters and Setters
        public String getEmail() {
            return email;
        }


        public void setEmail(String email) {
            this.email = email;
        }


        public String getCurrentPassword() {
            return currentPassword;
        }


        public void setCurrentPassword(String currentPassword) {
            this.currentPassword = currentPassword;
        }


        public String getNewPassword() {
            return newPassword;
        }


        public void setNewPassword(String newPassword) {
            this.newPassword = newPassword;
        }
    }

}
