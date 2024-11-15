import React from "react";

export default function DateCard({ current, isSelected, onDateSelect }) {
  const handleClick = () => {
    onDateSelect(current);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        padding: "15px",
        margin: "5px",
        borderRadius: "8px",
        border: isSelected ? "2px solid blue" : "1px solid gray",
        backgroundColor: isSelected ? "#e0f7fa" : "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "80px",
      }}
    >
      <h2 style={{ margin: 0 }}>{current.toLocaleDateString("en-US", { weekday: "short" })}</h2>
      <h5 style={{ margin: 0 }}>{current.toLocaleDateString("en-US", { month: "short" })}</h5>
      <h3 style={{ margin: 0 }}>{current.getDate()}</h3>
    </div>
  );
}
