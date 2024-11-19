package backtofront.example.demo.Controller;

import java.sql.Date;
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

import backtofront.example.demo.Address.AddressService;
import backtofront.example.demo.Admin.AdminService;
import backtofront.example.demo.Movie.Movie;
import backtofront.example.demo.Movie.MovieRepository;
import backtofront.example.demo.Movie.MovieService;
import backtofront.example.demo.PaymentCard.Card;
import backtofront.example.demo.PaymentCard.CardService;
import backtofront.example.demo.Promotion.Promotion;
import backtofront.example.demo.Promotion.PromotionService;
import backtofront.example.demo.ShowSeat.ShowSeatService;
import backtofront.example.demo.Showing.Showing;
import backtofront.example.demo.Showing.ShowingService;
import backtofront.example.demo.User.User;
import backtofront.example.demo.User.UserService;

@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:5500" })
@RequestMapping("/api")
public class Controller {

    private final AddressService addressService;
    private final AdminService adminService;
    private final MovieService movieService;
    private final CardService cardService;
    private final PromotionService promotionService;
    private final UserService userService;
    private final ShowingService showingService;
    private final ShowSeatService showSeatService;

    public MovieRepository movieRepository;

    public Controller(UserService userService, CardService cardService,
            AddressService addressService, MovieService movieService,
            AdminService adminService, ShowingService showingService,
            PromotionService promotionService, ShowSeatService showSeatService) {

        this.addressService = addressService;
        this.adminService = adminService;
        this.movieService = movieService;
        this.cardService = cardService;
        this.promotionService = promotionService;
        this.userService = userService;
        this.showingService = showingService;
        this.showSeatService = showSeatService;
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
                    user.getPromotions() // Get the boolean value
            );
            return ResponseEntity.ok(new ResponseMessage("User registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
        }
    }

    @PostMapping("/register-address")
    public ResponseEntity<?> registerUserAddress(@RequestBody RegisterAddressRequest address) {
        try {
            addressService.registerAddress(
                    address.getName(),
                    address.getStreet(),
                    address.getCity(),
                    address.getState(),
                    address.getZipCode(),
                    address.getEmail());
            return ResponseEntity.ok(new ResponseMessage("User address registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
        }
    }

    @PostMapping("/register-card")
    public ResponseEntity<?> registerCard(@RequestBody RegisterCardRequest cardRequest) {
        try {
            cardService.registerCard(
                    cardRequest.getCard_type(),
                    cardRequest.getCard_number(),
                    cardRequest.getExpirationDate(),
                    cardRequest.getSecurityCode(),
                    cardRequest.getEmail());
            return ResponseEntity.ok(new ResponseMessage("Card registered successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
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
                    user.getPromotions());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
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
                    updateProfileRequest.isRegisterForPromotions());
            return ResponseEntity.ok(new ResponseMessage("Profile updated successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
        }
    }

    // Update user password
    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        try {
            userService.updatePassword(
                    updatePasswordRequest.getEmail(),
                    updatePasswordRequest.getCurrentPassword(),
                    updatePasswordRequest.getNewPassword());
            return ResponseEntity.ok(new ResponseMessage("Password updated successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
        }
    }

    // set temp password when forgotten
    @PostMapping("/temp-password")
    public ResponseEntity<?> setTempPassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        try {
            userService.setTempPassword(
                    updatePasswordRequest.getEmail(),
                    updatePasswordRequest.getNewPassword());
            return ResponseEntity.ok(new ResponseMessage("Password updated successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
        }
    }

    @GetMapping("/get-showings-by-movie-id-and-show-date")
    public List<Showing> getShowingsByMovieIdAndShowDate(@RequestParam Movie movie, @RequestParam String date) {
        List<Showing> showings = showingService.findByMovieIdAndShowDate(movie, date);
        System.out.println("Fetched showings: " + showings);
        return showings;
    }

    @GetMapping("/get-showing-by-movie-id")
    public List<Showing> getShowingsByMovieId(@RequestParam Movie movie) {
        List<Showing> showings = showingService.findByMovieId(movie);
        System.out.println("Fetched showings: " + showings);
        return showings;
    }

    // Search for movies by title
    @GetMapping("/search-by-title")
    public List<Movie> getMovieByTitle(@RequestParam(required = false) String title) {
        if (title == null || title.isEmpty()) {
            return new ArrayList<>(); // Return an empty list if no title is provided
        }
        return movieService.findMoviesByTitle(title); // Use movieService for the search
    }

    // Search for movies by id
    @GetMapping("/search-by-id")
    public Movie getMovieById(@RequestParam(required = false) int id) {
        return movieService.findMovieById(id); // Use movieService for the search
    }

    @GetMapping("/movies-by-genre")
    public List<Movie> getMoviesByGenre(@RequestParam String genre) {
        if (genre == null || genre.isEmpty()) {
            return new ArrayList<>();
        }
        return movieService.findMoviesByGenre(genre);
    }

    @DeleteMapping("/movies/delete/{title}")
    public ResponseEntity<String> deleteMovieByTitle(@PathVariable String title) {
        boolean isDeleted = movieService.deleteMovieByTitle(title);
        if (isDeleted) {
            return ResponseEntity.ok("Movie deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Movie not found!");
        }
    }

    @GetMapping("/movies")
    public List<Movie> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        System.out.println("Fetched movies: " + movies);
        return movies;
    }

    @PostMapping("/movies")
    public ResponseEntity<String> addMovie(@RequestBody Movie movie) {
        try {
            movieService.addMovie(movie);
            return ResponseEntity.status(HttpStatus.CREATED).body("Movie added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error adding movie: " + e.getMessage());
        }
    }

    @PostMapping("/register-promo")
    public ResponseEntity<?> addPromo(@RequestBody Promotion promotion) {
        try {
            promotionService.registerPromotion(
                promotion.isBogo(),
                promotion.getDiscountPercent(),
                promotion.getPromoCode(),
                promotion.getExpirationDate()
            );
            return ResponseEntity.ok(new ResponseMessage("Promo registered and sent successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
        }
    }

    @GetMapping("/get-emails-for-promo")
    public List<String> getEmailsForPromos() {
        return userService.getEmailsForPromo();
    }

    // returns true if admin
    @GetMapping("/get-user-admin-status")
    public int getAdminStatus(@RequestParam String email) {
        return userService.getUserProfile(email).getAdmin();
    }

    @PostMapping("/update-seats")
    public ResponseEntity<?> updateSeats(@RequestParam int showTimeId, @RequestParam List<String> seatAvailability) {
        try {
            for (String seat : seatAvailability)
                showSeatService.registerShowSeat(seat, showingService.findById(showTimeId).get());
            return ResponseEntity.ok(new ResponseMessage("Promo registered and sent successfully!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
        }
    }

    @PostMapping("/register-showing")
    public ResponseEntity<?> registerShowing(@RequestBody Showing showing) {
        try {
            if (showingService.conflict(showing.getShowTime(), showing.getShowroomId())) {
                showingService.registerShowing(
                    showing.getDuration(),
                    showing.getShowTime(),
                    showing.getShowroomId(),
                    showing.getMovieId(),
                    showing.getShowDate()
                );
                return ResponseEntity.ok(new ResponseMessage("Showing registered successfully."));
            }
            else {
                return ResponseEntity.ok(new ResponseMessage("Scheduling conflict. Cannot register showing."));
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Internal server error"));
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

        public UserProfileResponse(String firstName, String lastName, String email, String phoneNumber, String password,
                int registerForPromos) {
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
        public String getPhoneNumber() {
            return phoneNumber;
        }

        @SuppressWarnings("unused")
        public String getPassword() {
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
        public String getExpiration_date() {
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
        public String getState() {
            return state;
        }

        @SuppressWarnings("unused")
        public String getZip_code() {
            return zip_code;
        }
    }

    // Request classes for profile and password updates
    private static class RegisterCardRequest {
        private String card_type;
        private String card_number;
        private String expiration_date;
        private String security_code;
        private String email;

        // Getters and Setters
        public String getCard_type() {
            return card_type;
        }

        public String getCard_number() {
            return card_number;
        }

        public String getExpirationDate() {
            return expiration_date;
        }

        public String getSecurityCode() {
            return security_code;
        }

        public String getEmail() {
            return email;
        }
    }

    private static class RegisterAddressRequest {

        private String name;
        private String street;
        private String city;
        private String state;
        private String zipCode;
        private String email;

        // Getters and Setters
        public String getName() {
            return name;
        }

        public String getStreet() {
            return street;
        }

        public String getCity() {
            return city;
        }

        public String getState() {
            return state;
        }

        public String getZipCode() {
            return zipCode;
        }

        public String getEmail() {
            return email;
        }

    }

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
