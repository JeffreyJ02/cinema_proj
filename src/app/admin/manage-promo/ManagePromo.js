'use client'

import React, { useState } from 'react';
import './ManagePromo.css';

const ManagePromo = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [promoType, setPromoType] = useState('');
  const [discount, setDiscount] = useState('');

  const handleCreatePromo = () => {
    setShowCreateForm(true);
  };

  const handleRemovePromo = () => {
    setShowRemoveForm(true);
  };

  const handleSubmitCreate = (event) => {
    event.preventDefault();
    // TO DO: Implement create promotion logic here
    const newPromo = { id: promoType, discount: discount };
    setPromotions([...promotions, newPromo]);
    setShowCreateForm(false);
  };

  const handleRemove = (promoId) => {
    // TO DO: Implement remove promotion logic here
    setPromotions(promotions.filter((promo) => promo.id !== promoId));
  };

  return (
    <div className="manage-promo-container">
      <h1>Manage Promotions</h1>
      <div className="button-container">
        <button onClick={handleCreatePromo}>Create Promotion</button>
        <button onClick={handleRemovePromo}>Remove Promotion</button>
      </div>
      {showCreateForm && (
        <form onSubmit={handleSubmitCreate}>
          <label>Promotion Type:</label>
          <select value={promoType} onChange={(e) => setPromoType(e.target.value)}>
            <option value="">Select a promotion type</option>
            <option value="DISCOUNT">Discount</option>
            <option value="BOGO">Buy One Get One Free</option>
          </select>
          {promoType === 'DISCOUNT' && (
            <div>
              <label>Discount Percentage:</label>
              <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </div>
          )}
          <button type="submit">Create Promotion</button>
        </form>
      )}
      {showRemoveForm && (
        <div>
          <h2>Active Promotions</h2>
          <ul>
            {promotions.map((promo) => (
              <li key={promo.id}>
                {promo.id} ({promo.discount}% off)
                <button className="remove-button" onClick={() => handleRemove(promo.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManagePromo;