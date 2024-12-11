import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { sendTempPassword } from '../../utils/email.js';
import './passwordReset.css';

function PasswordReset() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isTempPasswordSent, setIsTempPasswordSent] = useState(false);
  const [tempPassword, setTempPassword] = useState('');
  const [enteredTempPassword, setEnteredTempPassword] = useState('');
  const [expirationTime, setExpirationTime] = useState(null);


  const generatePassword = () => {
    const length = 8;
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    const allChars = upperCaseChars + lowerCaseChars + numberChars + symbolChars;
    let password = '';

    password += upperCaseChars.charAt(Math.floor(Math.random() * upperCaseChars.length));
    password += lowerCaseChars.charAt(Math.floor(Math.random() * lowerCaseChars.length));
    password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
    password += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));

    for (let i = 4; i < length; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Please Enter Valid Email Address');
      return;
    }

    // Generate a temporary password
    const tempPassword = generatePassword();
    setTempPassword(tempPassword);


    const expiration = Date.now() + 15 * 60 * 1000; // 15 minutes from now
    setExpirationTime(expiration);

    sendTempPassword({ user_email: email, tempPassword });
    setMessage(`A temporary password has been sent to ${email}.`);

    localStorage.setItem('tempPassword', tempPassword);
    localStorage.setItem('tempPasswordExpiration', expiration);

    setIsTempPasswordSent(true);
  };

  const handleTempPasswordVerification = () => {

    const currentTime = Date.now();
    const storedExpiration = localStorage.getItem('tempPasswordExpiration');


    if (currentTime > storedExpiration) {
      setError('Your temporary password has expired. Please request a new one.');
      setMessage('');
      return;
    }

    if (enteredTempPassword === tempPassword) {
      setMessage('Temporary password verified! You are now logged in.');
      setError('');


      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem("userEmail", email);


      router.push('/');
    } else {
      setError('Incorrect temporary password. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="passwordReset-container">
      <h2>Reset Password</h2>
      {!isTempPasswordSent ? (
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
      ) : (
        <div>
          <p>Please enter the temporary password sent to your email:</p>
          <input
            type="password"
            value={enteredTempPassword}
            onChange={(e) => setEnteredTempPassword(e.target.value)}
            placeholder="Temporary password"
            required
          />
          <button onClick={handleTempPasswordVerification}>Verify Temporary Password</button>
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}
        </div>
      )}
    </div>
  );
}

export default PasswordReset;
