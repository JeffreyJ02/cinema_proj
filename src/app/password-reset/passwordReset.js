'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import './passwordReset.css';

function passwordReset() {
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

    








} //passwordReset()



