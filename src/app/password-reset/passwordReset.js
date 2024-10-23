'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './passwordReset.css';
import { forgotPassword } from '../../utils/email';

function PasswordReset() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    //Function to generate password
    const generatePassword = () => {
        //Right now i just have a length of 8 because I want to impose it as the min length
        const length = 8;
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
        const allChars = upperCaseChars + lowerCaseChars + numberChars + symbolChars;
        let password = '';

        // Ensure at least one character from each category
        password += upperCaseChars.charAt(Math.floor(Math.random() * upperCaseChars.length));
        password += lowerCaseChars.charAt(Math.floor(Math.random() * lowerCaseChars.length));
        password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
        password += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));

        // Fill the rest of the password length with random characters
        for (let i = 4; i < length; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        // Shuffle the password to ensure randomness
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }; //generatePassword

    const handleSubmit = async (e)  => {
        e.preventDefault();
        setMessage('');
        setError('');

        //check for email
        if (!email) {
            setError('Please Enter Valid Email Address');
            return;
        }
        // still need to find way to check for valid email in DB


        const tempPassword = generatePassword();

        const message = "Here is your temporary password to help you log in: " + tempPassword;

        // Simulate sending email (replace this with your actual email sending logic)
        try {
            await forgotPassword( {
                email: email, 
                message: message} );
            console.log(`A temporary password ${tempPassword} has been sent to ${email}.`);
        } catch (error) {
            console.error('Failed to send email. Please try again later.');
        }

    }; //handleSubmit
    console.log('Component Rendered');
    return (
        <div className="passwordReset-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Send Temporary Password</button>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
            </form>
        </div>
    );

} //passwordReset()

export default PasswordReset;



