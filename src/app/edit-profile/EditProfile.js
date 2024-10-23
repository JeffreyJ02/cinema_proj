import { useEffect, useState } from 'react';
import './EditProfile.css';
import { editProfileEmail } from '../../utils/email';
import { encrypt } from '../../utils/encryption';

const EditProfile = () => {
  // State variables for form inputs
  const [firstName, setFirstName] = useState(''); // New state for first name
  const [lastName, setLastName] = useState(''); // New state for last name
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [address, setAddress] = useState('');
  const [storedCards, setStoredCards] = useState([]);
  const [errors, setErrors] = useState({});
  const [showAddCard, setShowAddCard] = useState(false);
  const [street, setStreet] = useState(''); // New state for street
  const [city, setCity] = useState(''); // New state for city
  const [state, setState] = useState(''); // New state for state
  const [zipCode, setZipCode] = useState(''); // New state for zip code
  const [promotionalEmails, setPromotionalEmails] = useState(false); //set it to false

  //fetch user data when page is ran
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/profile'); // Adjust the endpoint accordingly
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        // Assuming the API returns an object with the necessary fields
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email); // Prefill email
        setAddress(data.address);
        setStoredCards(data.savedCards || []); // Assuming the API returns saved cards
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

    

  // Function to validate email format
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Function to validate password complexity
  const validatePassword = (password) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

  // Function to handle form submission
  const handleSubmit = (e) => {
    console.log('Submitting form...');
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(email)) newErrors.email = "Invalid email";
    if (!validatePassword(newPassword)) newErrors.newPassword = "Password must include upper, lower, number, symbol, and be at least 8 characters long";
    if (newPassword !== confirmNewPassword) newErrors.confirmNewPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    //const encryptedPassword = btoa(newPassword);
    //const encryptedCreditCard = btoa(creditCardNumber.slice(0, -4) + "****" + creditCardNumber.slice(-4));

    const encryptedPassword = encrypt(newPassword);
    const encryptedCreditCard = encrypt(creditCardNumber.slice(0, -4) + "****" + creditCardNumber.slice(-4));

    console.log('Encrypted Password:', encryptedPassword);
    console.log('Encrypted Credit Card:', encryptedCreditCard);
    console.log('Address:', {
      street,
      city,
      state,
      zipCode,
    });
    try {
      console.log('Sending editProfile email...');
      editProfileEmail({email});
    } catch (error) {
      console.error('Error sending editProfile email:', error);
    }
  };

  // Function to add a new credit card to stored cards
  const handleAddCard = () => {
    const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (!cardNumberPattern.test(creditCardNumber)) {
      alert("Invalid credit card number format. Please use xxxx-xxxx-xxxx-xxxx.");
      return;
    }

    const expirationPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expirationPattern.test(expirationDate)) {
      alert("Invalid expiration date format. Please use MM/YY.");
      return;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      alert("CVV must be 3 or 4 digits.");
      return;
    }

    if (storedCards.length < 3) {
      const card = {
        number: creditCardNumber,
        cvv,
        expirationDate,
        billingAddress: address // Include billing address with the card
      };
      setStoredCards([...storedCards, card]);
      setCreditCardNumber('');
      setCvv('');
      setExpirationDate('');
      setShowAddCard(false);
    }
  };

  const handleDeleteCard = (index) => {
    const newCards = storedCards.filter((_, i) => i !== index);
    setStoredCards(newCards);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly //user cannot edit email
        />
      </label>
      <br />
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
      </label>
      <br />
      <label>
        Current Password:
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
        />
      </label>
      <br />
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </label>
      <br />
      <label>
        Confirm New Password:
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirm new password"
        />
      </label>
      <br />
      <label>
        Street:
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Enter street"
        />
      </label>
      <br />
      <label>
        City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
      </label>
      <br />
      <label>
        State:
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Enter state"
        />
      </label>
      <br />
      <label>
        Zip Code:
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter zip code"
        />
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={promotionalEmails}
          onChange={(e) => setPromotionalEmails(e.target.checked)}
          style={{ marginRight: '8px' }}
        />
        Toggle promotional emails
      </label>
      <br />
      {showAddCard ? (
        <div>
          <label>
            Credit Card Number:
            <input
              type="text"
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.target.value)}
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
          </label>
          <br />
          <label>
            Expiration Date:
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              placeholder="MM/YY"
            />
          </label>
          <br />
          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="***"
            />
          </label>
          <br />
          <label>
            Billing Address:
            <input
              type="text"
              value={address} // New input for billing address
              onChange={(e) => setAddress(e.target.value)} // New state for billing address
              placeholder="Enter billing address"
            />
          </label>
          <br />
          <button onClick={handleAddCard}>Add Card</button>
        </div>
      ) : (
        <button onClick={() => setShowAddCard(true)}>Add New Card</button>
      )}
      <br />
      <h2>Saved Cards:</h2>
      {storedCards.map((card, index) => (
        <div key={index}>
          <p>
          Card Number: ****{card.number.slice(-4)} {/* Display only the last 4 digits */}
            <br />
            Expiration Date: {card.expirationDate}
            <br />
            Billing Address: {card.billingAddress} 
          </p>
          <button onClick={() => handleDeleteCard(index)}>Delete Card</button>
        </div>
      ))}
      <br />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditProfile;

