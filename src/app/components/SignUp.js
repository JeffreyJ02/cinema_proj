import React, { useState } from "react";
import {
  TextField,
  Alert,
  Typography,
  MenuItem,
  Container,
  Box,
} from "@mui/material";
import { Modal, Button } from "react-bootstrap";
import { verificationCode } from "../../utils/email";
import { optInPromoEmails } from "../../utils/email";
import "./SignUpPage.css";
import Grid from "@mui/material/Grid2";
import { encrypt } from "../../utils/encryption";
import { hash } from '../../utils/encryption';
//import { register } from "module";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    creditCardNumber: "",
    expirationDate: "",
    cvv: "",
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
    const { email, confirmEmail, password, confirmPassword, creditCardNumber, expirationDate, cvv } = formData;

    if (email !== confirmEmail) {
      setErrorMessage("Email addresses do not match.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    

    if (creditCardNumber) {
      // Validate credit card number
      if (!/^\d{16}$/.test(creditCardNumber)) {
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
    
    if (cvv) {
      // Validate CVV
      if (!/^\d{3,4}$/.test(cvv)) {
        setErrorMessage("CVV must be 3 or 4 digits.");
        return; // Stops execution if validation fails
      }
    }
    
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
      //window.location.href = "/sign-in"; // Use anchor navigation, next router issues
    } else {
      setErrorMessage("Invalid verification code");
    }
  };

  // Submits user to the DB
  const submitUserData = async () => {
    console.log("submitUserData called");
    const { firstName, lastName, email, password, registerForPromotions } =
      formData;
      const promos = registerForPromotions ? 1 : 0;
      console.log("Reg for Promo: ", promos);

    try {
      const encryptedPassword = hash(password);
      const response = await fetch("http://localhost:8080/api/register-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password: encryptedPassword,
          registerForPromos: promos,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          setErrorMessage("An account with this email already exists.");
        } else {
          throw new Error(errorData.message || "Unknown Registration Error");
        }
        return;
      }

      if (promos == 1) sendOptInEmail(email);

      setSuccessMessage("Registration successful!");
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        creditCardNumber: "",
        expirationDate: "",
        cvv: "",
        registerForPromotions: false,
        billingName: "",
        billingAddress: "",
        billingCity: "",
        billingZip: "",
        billingState: "",
      });
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(error.message);
    }
    console.log("submitUserData end");
  };

const states = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
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
        <h2>Sign Up</h2>
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
          label="Credit Card Number"
          name="creditCardNumber"
          type="tel"
          inputMode="numeric"
          pattern="[0-9\s]{13,19}"
          autoComplete="cc-number"
          maxLength="19"
          placeholder="xxxx xxxx xxxx xxxx"
          value={formData.creditCardNumber}
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
          name="cvv"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{3-4}"
          maxLength="4"
          placeholder="123"
          value={formData.cvv}
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
          onChange={handleChange}
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
