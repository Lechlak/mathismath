"use client";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'; 

function Button({ text, icon, imageSrc, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={
        "text-gray-800 py-1 px-1 rounded-[2px] hover:bg-gray-200 transition-colors duration-200 " +
        className
      }
    >
      <div className="flex items-center justify-center">
        {icon && <FontAwesomeIcon icon={SolidIcons[icon]} className="mr-2" />} 
        {text && <span className="">{text}</span>}
        {imageSrc && <img src={imageSrc} alt={text || "Button Image"} className="h-5 w-5" />} {/* Add image support */}
      </div>
    </button>
  );
}

export default Button;
