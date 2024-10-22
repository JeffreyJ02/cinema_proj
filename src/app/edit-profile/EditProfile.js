import { useState } from 'react';
import './EditProfile.css';

const EditProfile = () => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [storedCards, setStoredCards] = useState([]);
  const [errors, setErrors] = useState({}); // State for error messages
  const [showAddCard, setShowAddCard] = useState(false); // State to control dropdown visibility

  // Function to validate email format
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Function to validate password complexity
  const validatePassword = (password) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password); // Updated regex for min length

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const newErrors = {}; // Object to hold any new error messages

    // Validate email and passwords, and populate newErrors if invalid
    if (!validateEmail(email)) newErrors.email = "Invalid email";
    if (!validatePassword(newPassword)) newErrors.newPassword = "Password must include upper, lower, number, symbol, and be at least 8 characters long";
    if (newPassword !== confirmNewPassword) newErrors.confirmNewPassword = "Passwords do not match";

    setErrors(newErrors); // Update state with any new errors
    if (Object.keys(newErrors).length > 0) return; // If there are errors, exit early

    // Encrypting passwords and credit card numbers (mock encryption)
    const encryptedPassword = btoa(newPassword); // Simple base64 encoding for demonstration
    const encryptedCreditCard = btoa(creditCardNumber.slice(0, -4) + "****" + creditCardNumber.slice(-4));

    // Log encrypted data to the console
    console.log('Encrypted Password:', encryptedPassword);
    console.log('Encrypted Credit Card:', encryptedCreditCard);
    console.log('Form submitted with billing address:', billingAddress);

    // Add logic to connect to the database and update user profile
  };

  // Function to add a new credit card to stored cards
  const handleAddCard = () => {
    if (storedCards.length < 4) { // Check if less than 4 cards are stored
      const card = {
        number: creditCardNumber,
        cvv,
        expirationDate,
      };
      setStoredCards([...storedCards, card]); // Add new card to stored cards
      // Reset fields after adding card
      setCreditCardNumber('');
      setCvv('');
      setExpirationDate('');
      setShowAddCard(false); // Hide the dropdown after adding the card
    }
  };

  // Function to delete a card from stored cards
  const handleDeleteCard = (index) => {
    const newCards = storedCards.filter((_, i) => i !== index); // Remove card at specified index
    setStoredCards(newCards); // Update state with new list of cards
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state on change
          placeholder="Enter email"
        />
        {errors.email && <span className="error">{errors.email}</span>} {/* Show email error */}
      </label>
      <br />
      <label>
        Current Password:
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)} // Update current password state on change
          placeholder=" Enter current password"
        />
      </label>
      <br />
      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} // Update new password state on change
          placeholder="Enter new password"
        />
        {errors.newPassword && <span className="error">{errors.newPassword}</span>} {/* Show new password error */}
      </label>
      <br />
      <label>
        Confirm New Password:
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)} // Update confirm new password state on change
          placeholder="Confirm new password"
        />
        {errors.confirmNewPassword && <span className="error">{errors.confirmNewPassword}</span>} {/* Show confirm new password error */}
      </label>
      <br />
      <label>
        Billing Address:
        <input
          type="text"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)} // Update billing address state on change
          placeholder="Enter billing address"
        />
      </label>
      <br />
      <button type="button" onClick={() => setShowAddCard(!showAddCard)}>Add Card</button>
      {showAddCard && (
        <div className="add-card-dropdown">
          <label>
            Credit Card Number:
            <input
              type="text"
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.target.value)} // Update credit card number state on change
              placeholder="Enter credit card number"
            />
          </label>
          <br />
          <label>
            Expiration Date:
            <input
              type="text"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)} // Update expiration date state on change
              placeholder="Enter expiration date"
            />
          </label>
          <br />
          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)} // Update cvv state on change
              placeholder="Enter cvv"
            />
          </label>
          <br />
          <button type="button" onClick={handleAddCard}>Add Card</button>
        </div>
      )}
      <ul>
        {storedCards.map((card, index) => (
          <li key={index}>
            {'****' + card.number.slice(-4)} (Expires: {card.expirationDate})
            <button type="button" onClick={() => handleDeleteCard(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditProfile;