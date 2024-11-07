"use client";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'; 

function Button({ text, icon, imageSrc, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border border-gray-300 py-1 ${
        num + 1 === 10 || num + 1 === 12 ? "px-3" : "px-4"
      } ${
        selectedFactFamily.includes(num + 1)
          ? "bg-[#fffe8b] border-blue-500 border-2"
          : ""
      } ${
        masteredFamilies.includes(
          `${selectedOperations.join(",")}-${num + 1}`
        )
          ? "bg-green-200"
          : ""
      }`}
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
