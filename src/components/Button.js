import React from "react";
import "./css/Button.css";

const Button = ({ onClick }) => {
  return (
    <button className="button_add" onClick={onClick}>
      <p>Créer une nouvelle tâche</p> 
    </button>
  );
};

export default Button;
