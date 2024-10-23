import { TextField } from '@mui/material';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { verificationCode } from '../../utils/email';
import './SignUpPage.css';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        registerForPromotions: false,
    });

    const [verifyData, setVerifyData] = useState({ verificationCode: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [show, setShow] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handles form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle verification code input changes
    const handleVerifyChange = (e) => {
        setVerifyData({ verificationCode: e.target.value });
    };

    // Generates a 6-digit verification code
    const generateVerificationCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedCode(code);
        return code;
    };

    // Send verification email
    const sendVerificationEmail = async (email_address) => {
        const code = generateVerificationCode();
        try {
            await verificationCode({
                email: email_address,
                message: `Your verification code is: ${code}`,
            });
            console.log('Verification email sent to:', email_address);
        } catch (error) {
            console.error('Error sending verification email:', error);
        }
    };

    // Verify the code entered by the user
    const handleVerify = async () => {
        if (verifyData.verificationCode === generatedCode) {
            setSuccessMessage('Account verified successfully!');
            setErrorMessage('');
            await submitUserData(); // Submit user data after verification
            window.location.href = '/sign-in'; // Navigate to sign-in page
        } else {
            setErrorMessage('Invalid verification code');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, confirmEmail, password, confirmPassword } = formData;

        if (email !== confirmEmail) {
            setErrorMessage('Email addresses do not match.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        await sendVerificationEmail(email);
        handleShow(); // Open the verification modal
    };

    // Submits user data to the database
    const submitUserData = async () => {
        const { firstName, lastName, email, password, registerForPromotions } = formData;

        try {
            const response = await fetch('http://localhost:8080/api/register-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    registerForPromotions,
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

            setSuccessMessage('Registration successful!');
            // Reset form data
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                confirmEmail: '',
                password: '',
                confirmPassword: '',
                registerForPromotions: false,
            });
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="signup">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
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
            </form>
            <Modal size="xl" show={show} onHide={handleClose}>
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
                    <Button variant="primary" onClick={handleVerify}>
                        Verify
                    </Button>
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
