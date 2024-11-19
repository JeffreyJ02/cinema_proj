'use client'

import React, { useState } from 'react';
import './ManagePromo.css';

const ManagePromo = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [promoType, setPromoType] = useState('');
  const [discount, setDiscount] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const handleCreatePromo = () => {
    setShowCreateForm(true);
  };

  const handleSubmitCreate = (event) => {
    event.preventDefault();
    // Create new promotion with promo code
    const newPromo = { id: promoType, discount: discount, code: promoCode };
    setPromotions([...promotions, newPromo]);
    setShowCreateForm(false);
    // Reset fields
    setPromoType('');
    setDiscount('');
    setPromoCode('');
  };

  return (
    <div className="manage-promo-container">
      <h1>Manage Promotions</h1>
      <div className="button-container">
        <button onClick={handleCreatePromo}>Create Promotion</button>
      </div>
      {showCreateForm && (
        <form onSubmit={handleSubmitCreate}>
          <label>Promotion Type:</label>
          <select value={promoType} onChange={(e) => setPromoType(e.target.value)}>
            <option value="">Select a promotion type</option>
            <option value="DISCOUNT">Discount</option>
            <option value="BOGO">Buy One Get One Free</option>
          </select>
          {promoType && (
            <div>
              {promoType === 'DISCOUNT' && (
                <div>
                  <label>Discount Percentage:</label>
                  <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                </div>
              )}
              <div>
                <label>Promo Code:</label>
                <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
              </div>
            </div>
          )}
          <button type="submit">Create Promotion</button>
        </form>
      )}
      <h2>Active Promotions</h2>
      <ul>
        {promotions.map((promo) => (
          <li key={promo.code}>
            {promo.id} {promo.id === 'DISCOUNT' ? `(${promo.discount}% off)` : ''} - Code: {promo.code}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePromo;
