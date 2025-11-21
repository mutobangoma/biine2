import React from "react";

const Card = ({ children, className = "", onClick }) => (
  <div className={`card ${className}`} onClick={onClick}>
    {children}
  </div>
);

export default Card;
