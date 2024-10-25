import { useEffect, useState } from 'react';
import { editProfileEmail } from '../../utils/email';
import { encrypt } from '../../utils/encryption';
import './EditProfile.css';

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); // Will be fetched
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
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Function to validate email format
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Function to validate password complexity
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

// Fetch user profile on component mount
useEffect(() => {
  const token = localStorage.getItem('token'); // Assuming token is stored in local storage
  const userEmail = localStorage.getItem('userEmail'); // Retrieve email from local storage or use context

  const fetchUserProfile = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user-profile?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // If you are using token-based authentication
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const userData = await response.json();
      // Update state with user data
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
      setStreet(userData.street);
      setCity(userData.city);
      setState(userData.state);
      setZipCode(userData.zipCode);
      setPromotionalEmails(userData.registerForPromotions);
      
      console.log(userData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchUserProfile(userEmail); // Call the fetch function with the user email
}, []);


  const handleEditUser = async () =>{
    console.log('handleEditUser');
    try {
      const profileResponse = await fetch('http://localhost:8080/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          promotionalEmails,
        }),
      });;

      if (!profileResponse.ok) {
        throw new Error('Failed to update profile');
      }

      const encryptedNewPassword = encrypt(newPassword);
      const encryptedCurrentPassword = encrypt(currentPassword);
      // Update password if provided
      if (newPassword) {
        const passwordResponse = await fetch('http://localhost:8080/api/update-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentPassword: encryptedCurrentPassword,
            newPassword: encryptedNewPassword,
          }),
        });

        if (!passwordResponse.ok) {
          throw new Error('Failed to update password');
        }
      }

      setSuccessMessage('Profile updated successfully.');
    } catch (error) {
      setErrors({ form: error.message });
    }
    console.log('handleEditUser done');
  };

  const handleEditAddress = async () =>{
    console.log('handleEditAddress');
    const addressResponse = await fetch('http://localhost:8080/api/update-address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        street, 
        city, 
        state, 
        zipCode }),
    });

    if (!addressResponse.ok) {
      throw new Error('Failed to update address');
    }
    console.log('handleEditAddress done');
  };

  const handleEditCard = async () => {
    console.log('handleEditCard');
    const encryptedCreditCard = encrypt(creditCardNumber.slice(0, -4) + "****" + creditCardNumber.slice(-4));

    try {
      const cardResponse = await fetch('http://localhost:8080/api/update-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creditCardNumber: encryptedCard,
          expirationDate,
          cvv,
          billingAddress: address,
        }),
      });

      if (!cardResponse.ok) {
        throw new Error('Failed to update card');
      }
    } catch (error) {
      throw new Error('Failed to update card');
    }
    console.log('handleEditCard done');
  };

  const handleSubmit = async (e) => {
    console.log('Submitting form...');
    e.preventDefault();
    setSuccessMessage('');
    const newErrors = {};

    console.log('1');
    if (newPassword && !validatePassword(newPassword)) {
      newErrors.newPassword = "Password must include upper, lower, number, symbol, and be at least 8 characters long";
    }
    if (newPassword && newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    console.log('2');
    setErrors(newErrors);
    // if (Object.keys(newErrors).length > 0) return; // Uncomment this line to prevent form submission if there are errors

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
    try {
      await handleEditUser();
      await handleEditAddress();
      await handleEditCard();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    console.log('Form submitted successfully');
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
        billingAddress: address,
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
      {successMessage && <p className="success-message">{successMessage}</p>}
      <label>
        Email:
        <input
          type="email"
          value={email}
          readOnly // Make email read-only
        />
      </label>
      <br />
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
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
        Receive promotional emails
      </label>
      <br />
      <button type="submit">Update Profile</button>
      <h3>Stored Credit Cards</h3>
      <button type="button" onClick={() => setShowAddCard(true)}>
        Add New Card
      </button>
      {showAddCard && (
        <div>
          <h4>Add Credit Card</h4>
          <label>
            Card Number:
            <input
              type="text"
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.target.value)}
              placeholder="xxxx-xxxx-xxxx-xxxx"
            />
          </label>
          <br />
          <label>
            Expiration Date (MM/YY):
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
              placeholder="CVV"
            />
          </label>
          <br />
          <label>
            Billing Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter billing address"
            />
          </label>
          <br />
          <button type="button" onClick={handleAddCard}>Add Card</button>
          <button type="button" onClick={() => setShowAddCard(false)}>Cancel</button>
        </div>
      )}
      {storedCards.length > 0 ? (
        <ul>
          {storedCards.map((card, index) => (
            <li key={index}>
              {card.number} - {card.expirationDate}
              <button type="button" onClick={() => handleDeleteCard(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No stored cards available.</p>
      )}
      {errors.form && <p className="error-message">{errors.form}</p>}
    </form>
  );
};

export default EditProfile;
