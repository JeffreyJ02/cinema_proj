"use client";

import React, { useState } from "react";
import "./ManagePromo.css";
import { emailPromo } from "@/utils/email";

const ManagePromo = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [promoType, setPromoType] = useState("");
  const [discount, setDiscount] = useState("");
  const [promoCode, setPromoCode] = useState("");

  const handleCreatePromo = () => {
    setShowCreateForm(true);
  };

  const handleSubmitCreate = async (event) => {
    event.preventDefault();
    // Create new promotion with promo code
    // promoType either BOGO or DISCOUNT
    const newPromo = { id: promoType, discount: discount, code: promoCode };
    console.log(newPromo);

    const response = await fetch("http://localhost:8080/api/register-promo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bogo: promoType === "BOGO" ? true : false,
        discountPercentage: discount,
        promoCode: promoCode,
        expirationDate: null,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(emails);
      throw new Error(
        errorData.message || "Unknown Error Registering Promotion"
      );
    } else {
      try {
        const emailsResponse = await fetch(
          "http://localhost:8080/api/get-emails-for-promo"
        );
        if (!emailsResponse.ok) {
          throw new Error(
            `Failed to fetch emails: ${emailsResponse.statusText}`
          );
        }

        const emails = await emailsResponse.json();
        console.log("Fetched emails:", emails);

        emails.forEach((email) =>
          console.log(`Email: ${email}, Promo Code: ${promoCode}`)
        );
        emails.forEach((email) => emailPromo({ email, promo: promoCode }));
        setShowCreateForm(false);
        setPromoType("");
        setDiscount("");
        setPromoCode("");
      } catch (error) {
        console.error("Error sending emails:", error);
      }
    }
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
          <select
            value={promoType}
            onChange={(e) => setPromoType(e.target.value)}
          >
            <option value="">Select a promotion type</option>
            <option value="DISCOUNT">Discount</option>
            <option value="BOGO">Buy One Get One Free</option>
          </select>
          {promoType && (
            <div>
              {promoType === "DISCOUNT" && (
                <div>
                  <label>Discount Percentage:</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
              )}
              <div>
                <label>Promo Code:</label>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
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
            {promo.id}{" "}
            {promo.id === "DISCOUNT" ? `(${promo.discount}% off)` : ""} - Code:{" "}
            {promo.code}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePromo;
