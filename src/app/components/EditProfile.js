import { useEffect, useState } from "react";
import { editProfileEmail } from "../../utils/email";
import { encrypt, hash } from "../../utils/encryption";
import {
  Alert,
  Box,
  Container,
  MenuItem,
  TextField,
  Typography,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Grid from "@mui/material/Grid2";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    billingState: "",
    zipCode: "",
    promotionalEmails: false,
    newPassword: "",
    confirmNewPassword: "",
    currentPassword: "",
    creditCardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(""); // Will be fetched
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");
  const [storedCards, setStoredCards] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAddCard, setShowAddCard] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Function to validate email format
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  // Function to validate password complexity
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Fetch user profile on component mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored in local storage
    const userEmail = localStorage.getItem("userEmail"); // Retrieve email from local storage or use context

    const fetchUserProfile = async (email) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user-profile?email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // If you are using token-based authentication
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await response.json();
        console.log("User Data: ", userData);
        // Update state with user data
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          street: userData.street,
          city: userData.city,
          billingState: userData.state,
          zipCode: userData.zipCode,
          promotionalEmails: userData.registerForPromotions,
          newPassword: "",
          confirmNewPassword: "",
          currentPassword: "",
          creditCardNumber: "",
          expirationDate: "",
          cvv: "",
        });

        console.log(userData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserProfile(userEmail); // Call the fetch function with the user email
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    console.log("Form submitted");
    setSuccessMessage("User information successfully updated");
    const newErrors = {};

    if (formData.newPassword && !validatePassword(formData.newPassword)) {
      newErrors.newPassword =
        "Password must include upper, lower, number, symbol, and be at least 8 characters long";
    }

    if (localStorage.getItem("tempPassword") !== formData.currentPassword) {
          
    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }
  }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    const encryptedNewPassword = hash(formData.newPassword);
    const encryptedCurrentPassword = hash(formData.currentPassword);
    const encryptedCreditCard = encrypt(
      creditCardNumber.slice(0, -4) + "****" + creditCardNumber.slice(-4)
    );
    console.log(formData)
    console.log("Address:", {
      street,
      city,
      state,
      zipCode,
    });
    try {
      console.log("Sending editProfile email... " + formData.email);
      //editProfileEmail({ email });
    } catch (error) {
      console.error("Error sending editProfile email:", error);
    }
    try {
      // Update user profile
      console.log("Updating profile...");
      const profileResponse = await fetch(
        "http://localhost:8080/api/update-profile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone_number: formData.phoneNumber,
          promotions: formData.promotionalEmails
          }),
        }
      );
      console.log("Profile response:", profileResponse);
      if (!profileResponse.ok) {
        throw new Error("Failed to update profile");
      }

      // Update password if provided
      console.log("outside password functionality")
      if (formData.newPassword) {
        console.log("here");
        const passwordResponse = await fetch(
          `http://localhost:8080/api/update-password?newpass=${encryptedNewPassword}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              password: encryptedCurrentPassword
            }),
          }
        );

        if (!passwordResponse.ok) {
          throw new Error("Failed to update password");
        } else {
          console.log("Password updated successfully");
        }
      }

      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  // Function to add a new credit card to stored cards
  const handleAddCard = () => {
    const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (!cardNumberPattern.test(creditCardNumber)) {
      alert(
        "Invalid credit card number format. Please use xxxx-xxxx-xxxx-xxxx."
      );
      return;
    }

    const expirationPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expirationPattern.test(expirationDate)) {
      alert("Invalid expiration date format. Please use MM/YY.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      alert("CVV must be 3 or 4 digits.");
      return;
    }

    if (storedCards.length < 3) {
      const card = {
        number: creditCardNumber,
        cvv,
        expirationDate,
        billingAddress: address,
      };
      setStoredCards([...storedCards, card]);
      setCreditCardNumber("");
      setCvv("");
      setExpirationDate("");
      setShowAddCard(false);
    }
  };

  const handleDeleteCard = (index) => {
    const newCards = storedCards.filter((_, i) => i !== index);
    setStoredCards(newCards);
  };

  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  return (
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            width: "66%",
            maxWidth: "500px",
            padding: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <h2>Edit Profile</h2>
          <h3>Personal Information</h3>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            fullWidth
            readOnly
            margin="normal"
          />
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <h3>Address Information</h3>
          <TextField
            label="Street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="state-select"
            select
            label="State"
            fullWidth
            value={formData.billingState}
            onChange={(e) =>
              handleChange({
                target: { name: "billingState", value: e.target.value },
              })
            }
          >
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
          <h3>Payment Cards</h3>
          <Button onClick={() => setShowAddCard(true)}>Add New Card</Button>
          {showAddCard && (
            <div>
              <TextField
                label="Credit Card Number"
                name="card_number"
                type="tel"
                inputMode="numeric"
                pattern="[0-9\s]{13,19}"
                autoComplete="cc-number"
                maxLength="19"
                placeholder="xxxx xxxx xxxx xxxx"
                value={formData.cardNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Expiration Date"
                name="expirationDate"
                type="tel"
                inputMode="numeric"
                pattern="/^[0-9]{3,4}$/"
                maxLength="5"
                placeholder="MM/YY"
                value={formData.expirationDate}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="CVV"
                name="securityCode"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{3-4}"
                maxLength="4"
                placeholder="123"
                value={formData.securityCode}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <button type="button" onClick={handleAddCard}>
                Add Card
              </button>
              <button type="button" onClick={() => setShowAddCard(false)}>
                Cancel
              </button>
            </div>
          )}
          {storedCards.length > 0 ? (
            <ul>
              {storedCards.map((card, index) => (
                <li key={index}>
                  {card.number} - {card.expirationDate}
                  <button type="button" onClick={() => handleDeleteCard(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No stored cards available.</p>
          )}
          {errors.form && <p className="error-message">{errors.form}</p>}
          <h3>Password</h3>
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            name="confirmNewPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <h3>Save Changes</h3>
          <p>To save your changes, please enter your current password</p>
          <TextField
            label="Password"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit">Save Changes</Button>
        </Box>
      </Container>
  );
};
export default EditProfile;
