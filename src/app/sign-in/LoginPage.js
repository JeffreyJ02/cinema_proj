'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './LoginPage.css';

function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [isMounted, setIsMounted] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        setIsMounted(true); // Set to true when mounted
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            // Sending API call to login endpoint
            const response = await fetch('http://localhost:8080/api/login-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Unknown Login Error');
            }

            const data = await response.json();
            console.log('Login successful:', data);

            // Here we should save the token to local storage
            localStorage.setItem('token', data.token);
            setSuccessMessage("Login successful! Redirecting..."); // Set success message
            isMounted && router.push('/'); // Redirect after successful login

        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage(error.message); // Set error message for user feedback
            setSuccessMessage(''); // Clear success message on error
        }
    };

    if (!isMounted) return null;

    return (
        <div className="loginPage-container">
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Log In</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
                <div className="logIn">
                    <p>
                        Don't have an account already? <a href="/sign-up">Sign Up</a>
                    </p>
                    <p>
                        Forgot Password? <a href="/password-reset">Forgot Password?</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
