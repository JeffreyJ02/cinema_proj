'use cleint';
import React, {useEffect, useState} from 'react';

import './LoginPage.css';
import { useRouter } from 'next/navigation';

function LoginPage() {
    const router = useRouter();
     const [formData, setFormData] = useState({
         email: '',
         password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isMounted, setIsMounted] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
     }

    useEffect(() => {
        setIsMounted(true); // Set to true when mounted
    }, []);
     
    const handleSubmit = async (e) => {
        e.preventDefault();
        const{email, password} = formData;

        try {
        // Sending api call to login endpoint
        /*
            SENDING EX:
            {
                "email": "u@ex.com",
                "password": "password" * password is sent over as plain text right now, I believe the backend will hash it
            }
        */
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Unknown Login Error');
        }
        const data = await response.json();
        /*
            RECEIVING EX:
            {
                "token": "abcxyz...", 
                "user": {
                    "id": 1,
                    "email": "u@ex.com",
                    "username": "JohnDoe",
                    "role": "user"
                }
            }
        */
        console.log('Login successful:', data);
        // Here we should save the token to local storage, larger storage than cookies
        localStorage.setItem('token', data.token);
        isMounted && router.push('/');
        } catch (error) {
        console.error('Login error:', error);
        setErrorMessage(error.message);
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
                <div className="logIn">
                    <p>
                        Don't have an account already? <a href="/sign-up">Sign Up</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
