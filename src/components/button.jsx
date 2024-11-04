"use client";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, far);


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
        {icon && <i className={`fas ${icon} ${text ? "mr-2" : ""}`}></i>}
        {text}
      </div>
    </button>
  );
}

function ButtonStory() {
  return (
    <div className="flex space-x-4 p-4">
      <Button text="Sign in" />
      <Button icon="fa-shopping-cart" />
    </div>
  );
}

export default Button;