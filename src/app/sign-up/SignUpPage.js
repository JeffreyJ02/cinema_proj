import { useEffect, useState } from 'react';
import './SignUpPage.css';
import { TextField } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    registerForPromotions: false,
    creditCardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const [verifyData, setVerifyData] = useState({ verificationCode: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleVerifyChange = (e) => {
    const { value } = e.target;
    console.log("Verification code: ", value);
    setVerifyData({ verificationCode: value });
  };

  const handleVerify = () => {
    console.log("Verifying account...");
    console.log("Verification code: ", verifyData.verificationCode);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmEmail,
      confirmPassword,
      registerForPromotions,
      creditCardNumber,
      expirationDate,
      cvv,
    } = formData;

    if (email !== confirmEmail) {
      setErrorMessage('Email addresses do not match.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    handleShow(); // Open verification modal

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          registerForPromotions,
          creditCardNumber,
          expirationDate,
          cvv,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          setErrorMessage('An account with this email already exists.');
        } else {
          throw new Error(errorData.message || 'Unknown Registration Error');
        }
        return;
      }

      setSuccessMessage(
        'Registration successful! A confirmation email has been sent to your email address.'
      );
      setErrorMessage('');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        registerForPromotions: false,
        creditCardNumber: '',
        expirationDate: '',
        cvv: '',
      });
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error.message);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
        {['firstName', 'lastName', 'email', 'confirmEmail', 'password', 'confirmPassword'].map((field) => (
          <div key={field} className="signup-info">
            <input
              type={field.includes('password') ? 'password' : 'text'}
              id={field}
              name={field}
              placeholder={field.replace(/([A-Z])/g, ' $1')}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <div className="signup-info">
          <input
            type="text"
            id="creditCardNumber"
            name="creditCardNumber"
            placeholder="Credit Card Number (Optional)"
            value={formData.creditCardNumber}
            onChange={handleChange}
          />
        </div>

        <div className="signup-info">
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            placeholder="Expiration Date (MM/YY) (Optional)"
            value={formData.expirationDate}
            onChange={handleChange}
          />
        </div>

        <div className="signup-info">
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="CVV (Optional)"
            value={formData.cvv}
            onChange={handleChange}
          />
        </div>

        <div className="signup-info">
          <label>
            <input
              type="checkbox"
              id="registerForPromotions"
              name="registerForPromotions"
              checked={formData.registerForPromotions}
              onChange={handleChange}
            />
            Register for Promotions
          </label>
        </div>

        <button type="submit">Sign Up</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="logIn">
          <p>
            Already have an account? <a href="/sign-in">Log In</a>
          </p>
        </div>
      </form>

      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            A verification email has been sent to your email address. Please enter the code below to verify your account.
          </p>
          <TextField
            value={verifyData.verificationCode}
            onChange={handleVerifyChange}
            placeholder="Verification Code"
            fullWidth
          />
          <Button variant="primary" onClick={handleVerify}>
            Verify
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUpPage;
