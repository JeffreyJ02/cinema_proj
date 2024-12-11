import { useEffect, useState } from 'react';
import { editProfileEmail } from '../../utils/email';
import { encrypt, hash } from '../../utils/encryption';
import './EditProfile.css';

const EditProfile = () => {
  // User info
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); // Will be fetched
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [promotionalEmails, setPromotionalEmails] = useState(false);

  // User card info
  const [creditCardType, setCreditCardType] = useState('');
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
  
  // User home address
  const [homeAddressId, setHomeAddressId] = useState('');

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
      console.log("User Data: ", userData);
      // Update state with user data

      // Connor added
      setUserId(userData.userId);
      setHomeAddressId(userData.homeAddress);

      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
      setPhoneNumber(userData.phoneNumber);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('User information successfully updated');
    const newErrors = {};

    if (newPassword && !validatePassword(newPassword)) {
      newErrors.newPassword = "Password must include upper, lower, number, symbol, and be at least 8 characters long";
    }
    if (newPassword && newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;


    const encryptedNewPassword = hash(newPassword);
    const encryptedCurrentPassword = hash(currentPassword);
    const encryptedCreditCard = encrypt(creditCardNumber.slice(0, -4) + "****" + creditCardNumber.slice(-4));

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

    await editProfileEmail( {email} );

    try {
      // Update user profile
      const name = firstName + " " + lastName;
      homeAddressId = await fetch('http://localhost:8080/api/update-address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          street,
          city,
          state,
          zipCode,
          homeAddressId
        }),
      });

      // register cards, store card ids (returned form update-card), and set cards for user (in User controller)
      for (let c = 0; c < storedCards.length; c++) {
        let card = storedCards[c];
        let cardType = card.cardType;
        let cardNumber = card.cardNumber;
        let cardExpirationDate = card.cardExpirationDate;
        let cardSecurityCode = card.cardSecuirtyCode;

        let address_id = await fetch('http://localhost:8080/api/update-address', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            street,
            city,
            state,
            zipCode,
            // addressId from address if updating? else null
          }),
        });

        let card_id = await fetch('http://localhost:8080/api/update-card', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cardType,
            cardNumber,
            cardExpirationDate,
            cardSecurityCode,
            addressId,
            // if updating include cardId. else null
          }),
        })
      }

      const profileResponse = await fetch('http://localhost:8080/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          phoneNumber,
          promotionalEmails,
          // card1Id. null if not used
          // card2Id. null if not used
          // card3Id. null if not used
        }),
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to update profile');
      }

      // Update password if provided
      if (newPassword) {
        const passwordResponse = await fetch('http://localhost:8080/api/update-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
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
        cardType,
        cardNumber: creditCardNumber,
        cardSecuirtyCode,
        expirationDate,
        // address id?
        // card id if pulled?
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
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
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
