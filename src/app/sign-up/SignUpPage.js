import { useEffect, useState } from 'react';
import './SignUpPage.css';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        registerForPromotions: false, // New field for promotions
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password, confirmEmail, confirmPassword, registerForPromotions } = formData;

        // Validate email and password confirmation
        if (email !== confirmEmail) {
            setErrorMessage("Email addresses do not match.");
            setSuccessMessage('');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setSuccessMessage('');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password, registerForPromotions }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                
                // Check for specific error indicating email already exists
                if (response.status === 409) {
                    setErrorMessage("An account already exists with this email address.");
                } else {
                    throw new Error(errorData.message || 'Unknown Registration Error');
                }
                
                setSuccessMessage('');
                return;
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            setSuccessMessage("Registration successful! A confirmation email has been sent to your email address.");
            setErrorMessage('');

            // Optionally clear form fields after successful registration
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
            setSuccessMessage('');
        }
    };

    if (!isMounted) return null;

    return (
        <div className="signup">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="signup-info">
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-info">
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-info">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-info">
                    <input
                        type="email"
                        id="confirmEmail"
                        name="confirmEmail"
                        placeholder="Confirm Email"
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-info">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="signup-info">
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
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
        </div>
    );
};

export default SignUpPage;
