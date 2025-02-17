import {
  Alert,
  Box,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Router } from "next/router";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { optInPromoEmails, verificationCode } from "../../utils/email";
import { encrypt, hash } from '../../utils/encryption';
//import { register } from "module";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    home_address: "",
    home_city:"",
    home_state:"",
    home_zip:"",
    card_number: "",
    card_type: "",
    expirationDate: "",
    securityCode: "",
    registerForPromotions: false,
    billingName: "",
    billingAddress: "",
    billingCity: "",
    billingZip: "",
    billingState: "GA",
  });
  const [verifyData, setVerifyData] = useState({ verificationCode: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [show, setShow] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handles form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle verification code input changes
  const handleVerifyChange = (e) => {
    setVerifyData({ verificationCode: e.target.value });
  };

  // Verification Logic!!
    // Generates 6 digit code with no leading 0
  const generateVerificationCode = () => {
    console.log("generateVerificationCode called");
    // THis is from https://stackoverflow.com/questions/21816595/how-to-generate-a-random-number-of-fixed-length-using-javascript
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code); // Sets the code with useState()
    return code;
  };

  // Send verification email
  const sendVerificationEmail = async (emailAddress) => {
    console.log("sendVerificationEmail called");
    const code = generateVerificationCode();
    console.log(code)
    try {
        // Async function to send verification code from email.js
      verificationCode({
        email: emailAddress,
        message: `Your verification code is: ${code}`,
      });
      console.log("Verification email sent to:", emailAddress);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  // Send opt-in email
  const sendOptInEmail = async (emailAddress) => {
    console.log("sendOptInEmail called");
    try {
        // Async function to send verification code from email.js
      optInPromoEmails( {email: emailAddress} );
    } catch (error) {
      console.error("Error sending opt-in email:", error);
    }
  };

  const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    const { email, confirmEmail, password, confirmPassword, phone_number, card_number, expirationDate, securityCode } = formData;

    console.log('errror checking')
    if (email !== confirmEmail) {
      setErrorMessage("Email addresses do not match.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (phone_number) {
      // Validate phone number (example: must be 10 digits)
      if (!/^\d{10}$/.test(formData.phone_number)) {
        setErrorMessage("Phone number must be exactly 10 digits.");
        return; // Stops execution if validation fails
      }
    }
    
    if (card_number) {
      // Validate credit card number
      if (!/^\d{16}$/.test(card_number)) {
        setErrorMessage("Credit card number must be exactly 16 digits.");
        return; // Stops execution if validation fails
      }
    }
    
    if (expirationDate) {
      // Validate expiration date
      const [month, year] = expirationDate.split("/");
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Months are 0-based
      const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
    
      if (!/^\d{2}\/\d{2}$/.test(expirationDate) || 
          (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth))) {
        setErrorMessage("Expiration date must be in MM/YY format and not expired.");
        return; // Stops execution if validation fails
      }
    }
    
    if (securityCode) {
      // Validate CVV
      if (!/^\d{3,4}$/.test(securityCode)) {
        setErrorMessage("CVV must be 3 or 4 digits.");
        return; // Stops execution if validation fails
      }
    }
    console.log('no errors')
    // If all validations pass or credit card fields are empty, continue to send verification email
    await sendVerificationEmail(email); // Send verification email
    handleShow(); // Open the verification modal
  };

  // Verify the code entered by the user
  const handleVerify = async () => {
    console.log("handleVerify called");
    if (verifyData.verificationCode === generatedCode) {
      setSuccessMessage("Email verified successfully!");
      setErrorMessage("");
      await submitUserData(); // This submits the user data to the db AFTER
      handleClose();
      window.location.href = "/sign-in"; // Use anchor navigation, next router issues
    } else {
      setErrorMessage("Invalid verification code");
    }
  };

  // Submits user to the DB
  const submitUserData = async () => {
    console.log("submitUserData called");
    const { firstName, lastName, email, password, phone_number, registerForPromotions, billingName, billingAddress, billingCity, billingState, billingZip, card_number, card_type, expirationDate, securityCode } =
      formData;
      const promos = registerForPromotions ? 1 : 0;
      console.log("Reg for Promo: ", promos);
      console.log("Phone Number Submit: ", phone_number);
      console.log("Form Data: ", formData);

    try {
      const encryptedPassword = hash(password);
      const response = await fetch("http://localhost:8080/api/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone_number,
          password: encryptedPassword,
          registerForPromos: promos,
        }),
      });
      const userID = await fetch(`http://localhost:8080/api/get-user-id-by-email?email=${email}`);
      console.log("User Response: ", response);
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          setErrorMessage("An account with this email already exists.");
        } else {
          throw new Error(errorData.message || "Unknown Registration Error");
        }
        return;
      }

      const userData = await response.json();
      const userId = userData?.Id;

      
      if (billingName) {
        let billingID = await registerAddress(email, billingName, billingAddress, billingCity, billingZip, billingState, userID, false);
        if(card_number) {
          await registerCard(email, encrypt(card_type), encrypt(card_number), encrypt(expirationDate), encrypt(securityCode), userID, billingID);
        }
      }
        

      

      if (promos == 1) sendOptInEmail(email);

      setSuccessMessage("Registration successful!");
      // Reset form
      Router.push("/sign-in");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(error.message);
    }
    console.log("submitUserData end");
  };

  const registerCard = async (email, card_type, card_number, expirationDate, securityCode) => {
    try {
      console.log("Registering card");
      await fetch("http://localhost:8080/api/register-card", {
        method: "POST",
        
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          card_type: card_type,
          card_number: card_number,
          expirationDate: expirationDate, 
          securityCode: securityCode
        })
      });
      console.log("Credit card registered successfully");
    } catch (error) {
      console.error("Error registering card:", error);
      throw error; // Rethrow to handle in submitUserData
    }
  };

  // Function to register the address
const registerAddress = async (email, billingName, billingAddress, billingCity, billingZip, billingState) => {
  try {
    await fetch(`http://localhost:8080/api/register-address?user_id=${userId}`, {
      method: "POST",
      
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        name: billingName,
        street: billingAddress,
        city: billingCity,
        state: billingState,
        zipCode: billingZip,
        email: email,
        home: true
      })
    });
    console.log("Address registered successfully");
  } catch (error) {
    console.error("Error registering address:", error);
    throw error; // Rethrow to handle in submitUserData
  }
};

const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const cardTypes = ["Visa", "MasterCard", "American Express", "Discover"];

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
        <h2>Sign Up</h2>
        <Grid xs="auto">
          <Typography>Personal Information</Typography>
        </Grid>
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
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm Email"
          name="confirmEmail"
          value={formData.confirmEmail}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="phone_number"
          type="tel"
          required
          value={formData.phone_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Grid xs="auto">
          <Typography>Home Address</Typography>
        </Grid>
        <TextField
          label="Address"
          name="home_address"
          value={formData.home_address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="home_city"
          value={formData.home_city}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Zip or Postal Code"
          name="home_zip"
          value={formData.home_zip}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          id="state-select"
          select
          label="State"
          value={formData.home_state}
          onChange={(e) =>
            handleChange({ target: { name: "billingState", value: e.target.value } })
          }        
        >
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </TextField>
        
        <Grid xs="auto">
          <Typography>Credit Card Information</Typography>
        </Grid>
        <TextField
          id="type-select"
          select
          label="Card Type"
          value={formData.card_type}
          fullWidth
          onChange={(e) =>
            handleChange({ target: { name: "card_type", value: e.target.value } })
          }        
        >
          {cardTypes.map((ctype) => (
            <MenuItem key={ctype} value={ctype}>
              {ctype}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Credit Card Number"
          name="card_number"
          type="tel"
          inputMode="numeric"
          pattern="[0-9\s]{13,19}"
          autoComplete="cc-number"
          maxLength="19"
          placeholder="xxxx xxxx xxxx xxxx"
          value={formData.card_number}
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
        <Grid xs="auto">
          <Typography>Billing Address</Typography>
        </Grid>
        <TextField
          label="Name"
          name="billingName"
          type="text"
          value={formData.billingName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Street Address"
          name="billingAddress"
          value={formData.billingAddress}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="billingCity"
          value={formData.billingCity}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Zip or Postal Code"
          name="billingZip"
          value={formData.billingZip}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          id="state-select"
          select
          label="State"
          value={formData.billingState}
          onChange={(e) =>
            handleChange({ target: { name: "billingState", value: e.target.value } })
          }        
        >
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </TextField>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="registerForPromotions"
              checked={formData.registerForPromotions}
              onChange={handleChange}
            />
            Register for Promotions
          </label>
          <Button type="submit" variant="primary">
            Sign Up
          </Button>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </div>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Verify Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please enter the verification code sent to your email:</p>
            <TextField
              value={verifyData.verificationCode}
              onChange={handleVerifyChange}
              placeholder="Verification Code"
              fullWidth
            />
            <Button variant="primary" onClick={handleVerify} className="mt-3">
              Verify
            </Button>
            {errorMessage && (
              <Alert severity="error" className="mt-2">
                {errorMessage}
              </Alert>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </Container>
  );
};

export default SignUpPage;
