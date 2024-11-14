import React from "react";

export default function DateCard({ current, isSelected, onDateSelect }) {
  const handleClick = () => {
    onDateSelect(current);
  };

  return (
    <div
      className={`card ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
      style={{
        cursor: "pointer",
        padding: "10px",
        border: isSelected ? "2px solid blue" : "1px solid gray",
        backgroundColor: isSelected ? "#e0f7fa" : "#fff",
      }}
    >
      <h2>{current.toLocaleDateString("en-US", { weekday: "short" })}</h2>
      <h5>{current.toLocaleDateString("en-US", { month: "short" })}</h5>
      <h3>{current.getDate()}</h3>
    </div>
  );
}
