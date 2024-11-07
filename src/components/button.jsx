"use client";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as RegularIcons from '@fortawesome/free-regular-svg-icons'; 

function Button({ text, icon, imageSrc, onClick, className }) {
// Determine padding based on the value of `text`
const paddingClass =
text === 10 || text === 12 ? "py-4 px-3" : "py-4 px-4";

return (
<button
  onClick={onClick}
  className={`text-gray-800 ${paddingClass} rounded-[2px] hover:bg-gray-200 transition-colors duration-200 ${className || ""}`}
>
  <div className="flex items-center justify-center">
    {icon && <FontAwesomeIcon icon={SolidIcons[icon]} className="mr-2" />}
    {text && <span>{text}</span>}
    {imageSrc && (
      <img src={imageSrc} alt={text || "Button Image"} className="h-5 w-5" />
    )}
  </div>
</button>
);
}

export default Button;
