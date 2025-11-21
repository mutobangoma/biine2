import React from "react";

const Button = ({ children, variant = "primary", onClick, className = "", ...props }) => {
  const base = "btn " + (variant === "outline" ? "btn-outline" : "btn-primary");
  return (
    <button className={`${base} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
