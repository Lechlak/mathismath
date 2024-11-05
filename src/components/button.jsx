"use client";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'; // Import from free-regular-svg-icons

function Button({ text, icon, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={
        "bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-[8px] hover:bg-gray-200 transition-colors duration-200 " +
        className
      }
    >
      <div className="flex items-center justify-center">
        {icon && <FontAwesomeIcon icon="far fa-check-circle" className={`${text ? "mr-2" : ""}`} />} {/* Use FontAwesomeIcon here */}
        {text}
      </div>
    </button>
  );
}

function ButtonStory() {
  return (
    <div className="flex space-x-4 p-4">
      <Button text="Sign in" />
      <Button icon={faShoppingCart} /> {/* Pass the imported icon here */}
    </div>
  );
}

export default Button;
